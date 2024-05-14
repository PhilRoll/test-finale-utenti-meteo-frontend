import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

export function Logout() {

    const { resetContext } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        resetContext();
        //TODO fetch sul db di logout
        navigate('/');
    };

    return (
        <div className="ml-auto">
            <button className="btn btn-outline-primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}