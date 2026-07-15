import React from 'react'; 

import { Navigate } from 'react-router-dom';

import { getToken, getRole } from "../utils/authService.js";

export default function ProtectedRoute({ children }) {
    
    const token = getToken();
    const role = getRole();

    if(!token){
        return <Navigate to="/login" replace />;
    }

    if(role !== "admin"){
        return (
        <div className="min-h-screen bg-amazon-bg flex justify-center items-start pt-8 px-4">
            <div className="w-full max-w-5xl rounded-full border border-red-400 bg-amazon-surface px-6 py-4">
                <p className="font-medium text-amazon-textDark">
                    Access denied. Admin only.
                </p>
            </div>
        </div>
        
    ); 
    }
    
    return children;

};


