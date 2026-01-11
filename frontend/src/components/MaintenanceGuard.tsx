import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getUser } from '../services/authService';

const MaintenanceGuard = ({ children }: { children: React.ReactNode }) => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const user = getUser();

    useEffect(() => {
        const checkMaintenance = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/settings`);
                const data = await response.json();
                if (data.success && data.settings) {
                    setMaintenanceMode(data.settings.maintenance_mode === 'true' || data.settings.maintenance_mode === true);
                }
            } catch (err) {
                console.error("Maintenance check failed", err);
            } finally {
                setLoading(false);
            }
        };

        checkMaintenance();
    }, [location.pathname]);

    if (loading) return null;

    // Exempt paths
    const isMaintenancePage = location.pathname === '/maintenance';
    const isLoginPage = location.pathname === '/login';
    const isAdminPath = location.pathname.startsWith('/admin');

    // Admins are exempt to allow them to turn it off
    const isAdminUser = user?.role === 'admin';

    if (maintenanceMode && !isAdminUser && !isAdminPath && !isMaintenancePage && !isLoginPage) {
        return <Navigate to="/maintenance" replace />;
    }

    // If maintenance is OFF and we are on maintenance page, go back to home
    if (!maintenanceMode && isMaintenancePage) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default MaintenanceGuard;
