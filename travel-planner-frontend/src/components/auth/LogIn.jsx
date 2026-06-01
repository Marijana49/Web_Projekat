import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { LogIn } from "../../services/AuthService";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export function LogInForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        };

        try{
            const res = await LogIn(user);

            if(res.status == 200){
                console.log(res.data);
                const tokenString = res.data.token;
                login(tokenString);

                setEmail("");
                setPassword("");

                navigate("/");
            }
        } catch(error){
            console.log(error);
        }
    };

return (
    <div>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log in</button>
            <p style={{ marginTop: "15px" }}>
                No account? <Link to="/register">Regiser</Link>
            </p>
        </form>
    </div>
)
};