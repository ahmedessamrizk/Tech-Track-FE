import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/tokenFunctions';

export default function LoggedRoute({ children, redirectTo }) {
    const isAuthenticated = !!getToken();

    if (!isAuthenticated) {
        return children ? children : <Outlet />;
    }
    return <Navigate to={redirectTo} />;

}
