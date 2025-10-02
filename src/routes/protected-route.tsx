import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  element: ReactNode;
  onlyUnAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, onlyUnAuth = false }) => {
    const { isLoggedIn, isAuthChecked } = useSelector((state: any) => state.auth);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (!onlyUnAuth && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (onlyUnAuth && isLoggedIn) {
        const from = location.state?.from || { pathname: '/' };
        return <Navigate to={from} replace />;
    }

    return element;
};

export default ProtectedRoute;