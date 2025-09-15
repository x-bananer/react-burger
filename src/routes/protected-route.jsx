import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, onlyUnAuth = false }) => {
    const { isLoggedIn, isAuthChecked } = useSelector(state => state.auth);
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

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  onlyUnAuth: PropTypes.bool,
};

export default ProtectedRoute;