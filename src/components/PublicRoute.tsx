import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PublicRoute({ children }: { children: React.ReactNode }) {
    // const { isChecked, user } = useAuth();
    // console.log("PublicRoute");
    // console.log(user);
    // if (user) {
    //     return <Navigate to="/dashboard" replace />;
    // }
    
    // if (!isChecked) {
    //     return "";
    // } else {
    //     return <>{children}</>;
    // }
    return <>{children}</>;
}