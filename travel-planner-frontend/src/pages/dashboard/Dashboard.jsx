import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { useNavigate } from "react-router-dom";

export function Dashboard(){
    const {user, logout, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login");
        }
    }, [isAuthenticated, navigate])

    const handleLogout = () => {
        logout();
    };

    return(
        <div>
            <div>
                <h1>Dobrodošli, {user?.email}!</h1>
                <button onClick={handleLogout}>
                    Log Out
                </button>
            </div>
            <button onClick={() => navigate("/travel-plans/new")}>
                Kreiraj plan putovanja
            </button>
            <button onClick={() => navigate("/travel-plans")}>
                Planovi putovanja
            </button>
        </div>
    )
};