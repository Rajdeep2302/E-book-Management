import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

/**
 * Protected Route Component
 * Checks if user is authenticated and optionally if they have the required role
 */
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');

    // Not logged in - redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Check for required role
    if (requiredRole && userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.role !== requiredRole) {
                // User doesn't have required role - redirect to home
                return <Navigate to="/" replace />;
            }
        } catch {
            // Invalid user data - redirect to login
            return <Navigate to="/login" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
