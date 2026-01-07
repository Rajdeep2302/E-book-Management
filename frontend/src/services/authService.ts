/**
 * Authentication API Service
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        isVerified: boolean;
    };
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    institute?: string;
    student?: boolean;
    teacher?: boolean;
}

interface LoginData {
    email: string;
    password: string;
}

/**
 * Signup a new user
 */
export const signup = async (data: SignupData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

/**
 * Login a user
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

/**
 * Get current user info
 */
export const getMe = async (token: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
};

/**
 * Request password reset
 */
export const forgotPassword = async (email: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
};

/**
 * Reset password with token
 */
export const resetPassword = async (token: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    return response.json();
};

/**
 * Store auth token
 */
export const setToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

/**
 * Get stored auth token
 */
export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

/**
 * Remove auth token (logout)
 */
export const removeToken = (): void => {
    localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

/**
 * Change password (for logged-in users)
 */
export const changePassword = async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
    });
    return response.json();
};

/**
 * Store user data in localStorage
 */
export const setUser = (user: AuthResponse['user']): void => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

/**
 * Get stored user data
 */
export const getUser = (): AuthResponse['user'] | null => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};

/**
 * Clear all auth data (full logout)
 */
export const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};


/**
 * Delete current user account
 */
export const deleteAccount = async (): Promise<AuthResponse> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
};
