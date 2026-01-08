import { Navigate, useLocation } from 'react-router-dom';
import { getToken, getUser } from '../services/authService';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'student' | 'teacher' | 'admin';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const location = useLocation();
    const token = getToken();
    const user = getUser();

    // Not logged in
    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role check (if required)
    if (requiredRole && user.role !== requiredRole) {
        // Redirect non-admins away from admin routes
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
