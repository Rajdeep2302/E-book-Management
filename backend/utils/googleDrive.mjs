import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Initialize Google Drive API with API Key (for public folders)
// The folder must be shared "Anyone with the link"
const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// For uploading, we need a service account
let driveClient = null;

/**
 * Initialize Google Drive client with service account credentials
 * The service account JSON should be in the environment or as a file
 */
const initDriveClient = () => {
    if (driveClient) return driveClient;

    try {
        // Check if service account credentials are provided as JSON string or file path
        const serviceAccountCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

        if (!serviceAccountCredentials) {
            console.warn('⚠ Google Service Account not configured. Upload to Drive will be disabled.');
            return null;
        }

        let credentials;

        // Try parsing as JSON first
        try {
            credentials = JSON.parse(serviceAccountCredentials);
        } catch {
            // If not JSON, treat as file path
            const keyFilePath = path.resolve(serviceAccountCredentials);
            if (fs.existsSync(keyFilePath)) {
                credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
            } else {
                console.error('❌ Service account key file not found:', keyFilePath);
                return null;
            }
        }

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        driveClient = google.drive({ version: 'v3', auth });
        console.log('✓ Google Drive client initialized');
        return driveClient;
    } catch (err) {
        console.error('❌ Failed to initialize Google Drive client:', err.message);
        return null;
    }
};

/**
 * Upload a file to Google Drive
 * @param {string} filePath - Path to the file to upload
 * @param {string} fileName - Name for the file in Drive
 * @param {string} mimeType - MIME type of the file
 * @returns {Promise<{fileId: string, webViewLink: string, webContentLink: string} | null>}
 */
export const uploadToDrive = async (filePath, fileName, mimeType) => {
    const drive = initDriveClient();

    if (!drive) {
        console.warn('Drive client not available, skipping upload');
        return null;
    }

    if (!GOOGLE_DRIVE_FOLDER_ID) {
        console.warn('GOOGLE_DRIVE_FOLDER_ID not set, skipping upload');
        return null;
    }

    try {
        const fileMetadata = {
            name: fileName,
            parents: [GOOGLE_DRIVE_FOLDER_ID],
        };

        const media = {
            mimeType,
            body: fs.createReadStream(filePath),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media,
            fields: 'id, webViewLink, webContentLink',
        });

        // Make the file publicly accessible
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        console.log(`✓ Uploaded to Drive: ${fileName} (${response.data.id})`);

        return {
            fileId: response.data.id,
            webViewLink: response.data.webViewLink,
            webContentLink: response.data.webContentLink,
        };
    } catch (err) {
        console.error('❌ Failed to upload to Drive:', err.message);
        return null;
    }
};

/**
 * Get a public embed URL for a Drive file
 * @param {string} fileId - Google Drive file ID
 * @returns {string}
 */
export const getDriveViewUrl = (fileId) => {
    if (!fileId) return null;
    return `https://drive.google.com/file/d/${fileId}/view`;
};

/**
 * Get a direct download URL for a Drive file
 * @param {string} fileId - Google Drive file ID
 * @returns {string}
 */
export const getDriveDownloadUrl = (fileId) => {
    if (!fileId) return null;
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

/**
 * Get an embeddable preview URL for PDFs
 * @param {string} fileId - Google Drive file ID
 * @returns {string}
 */
export const getDrivePreviewUrl = (fileId) => {
    if (!fileId) return null;
    return `https://drive.google.com/file/d/${fileId}/preview`;
};

/**
 * Delete a file from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise<boolean>}
 */
export const deleteFromDrive = async (fileId) => {
    const drive = initDriveClient();

    if (!drive || !fileId) {
        return false;
    }

    try {
        await drive.files.delete({ fileId });
        console.log(`✓ Deleted from Drive: ${fileId}`);
        return true;
    } catch (err) {
        console.error('❌ Failed to delete from Drive:', err.message);
        return false;
    }
};

export default {
    uploadToDrive,
    getDriveViewUrl,
    getDriveDownloadUrl,
    getDrivePreviewUrl,
    deleteFromDrive,
};
