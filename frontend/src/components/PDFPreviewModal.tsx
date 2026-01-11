import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, Loader2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PDFPreviewModalProps {
    fileUrl: string;
    onClose: () => void;
    title: string;
    maxPages?: number;
}

const PDFPreviewModal = ({ fileUrl, onClose, title, maxPages = 10 }: PDFPreviewModalProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(Math.min(numPages, maxPages));
        setLoading(false);
    }

    const changePage = (offset: number) => {
        setPageNumber(prev => Math.min(Math.max(1, prev + offset), maxPages));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl h-[90vh] bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#111]">
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                            PREVIEW: {title}
                            <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                                Guest Mode
                            </span>
                        </h3>
                        <p className="text-xs text-gray-500">Showing first {maxPages} pages only</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-[#0a0a0a] flex justify-center p-8 relative">
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadStart={() => setLoading(true)}
                        loading={
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            </div>
                        }
                        className="shadow-2xl"
                    >
                        {/* Render current page */}
                        {!loading && (
                            <div className="relative">
                                <Page
                                    pageNumber={pageNumber}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="border border-white/10 shadow-lg"
                                    width={Math.min(window.innerWidth * 0.8, 600)}
                                />
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs mt-2">
                                    Page {pageNumber} of {numPages}
                                </div>
                            </div>
                        )}
                    </Document>
                </div>

                {/* Footer / Controls */}
                <div className="p-4 border-t border-white/5 bg-[#111] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            disabled={pageNumber <= 1}
                            onClick={() => changePage(-1)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-sm font-medium text-gray-400">
                            {pageNumber} / {numPages}
                        </span>
                        <button
                            disabled={pageNumber >= maxPages}
                            onClick={() => changePage(1)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {pageNumber === maxPages && (
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-400 hidden sm:block">Want to read more?</span>
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <Lock className="w-4 h-4" /> Login to Unlock Full Book
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PDFPreviewModal;
