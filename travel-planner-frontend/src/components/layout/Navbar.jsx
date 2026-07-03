import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const hideBackButton = location.pathname === "/" || location.pathname === "/login";

    return (
        <nav className="global-navbar">
            {!hideBackButton && (
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Nazad
                </button>
            )}
            <div className="nav-title">Travel Planner</div>
        </nav>
    );
}