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

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dobrodošli, {user?.email}!</h1>
                <button className="logout-btn" onClick={logout}>
                    Log Out
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="action-card" onClick={() => navigate("/travel-plans/new")}>
                    <h3>+ Kreiraj novi plan</h3>
                </div>
                <div className="action-card" onClick={() => navigate("/travel-plans")}>
                    <h3>Moji planovi</h3>
                </div>
                {user?.role === "ADMIN" && (
                    <div className="action-card" onClick={() => navigate("/travel-plans/users")}>
                        <h3>Upravljanje korisnicima</h3>
                    </div>
                )}
            </div>
        </div>
    );
};