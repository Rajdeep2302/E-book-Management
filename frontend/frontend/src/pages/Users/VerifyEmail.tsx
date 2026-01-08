import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const VerifyEmail = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/verify-email/${token}`);
                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    setMessage(data.message || 'Email verified successfully!');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed. The link may be expired.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Verification failed. Please try again.');
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setStatus('error');
            setMessage('Invalid verification link.');
        }
    }, [token]);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-md w-full mx-6 p-8 bg-gray-900/50 border border-gray-800 rounded-3xl text-center">
                {status === 'loading' && (
                    <>
                        <div className="flex justify-center mb-6">
                            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Verifying Your Email</h2>
                        <p className="text-gray-400">Please wait while we verify your email address...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-green-400">Email Verified!</h2>
                        <p className="text-gray-400 mb-6">{message}</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                        >
                            Continue to Login
                        </button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="flex justify-center mb-6">
                            <XCircle className="w-16 h-16 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-red-400">Verification Failed</h2>
                        <p className="text-gray-400 mb-6">{message}</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                            >
                                Sign Up Again
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                            >
                                Go to Home
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
