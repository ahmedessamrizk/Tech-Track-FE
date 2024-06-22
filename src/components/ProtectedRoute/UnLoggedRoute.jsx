import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/tokenFunctions';

export default function UnLoggedRoute({ children, redirectTo }) {
    const isAuthenticated = !!getToken();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }
    return children ? children : <Outlet />;

}
