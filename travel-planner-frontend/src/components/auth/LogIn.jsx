import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { LogIn } from "../../services/AuthService";
import { LoginRequest } from "../../models/dtos/LoginRequest"
import { ValidateLoginForm } from "../../validations/AuthValidation";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export function LogInForm({onSuccess}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateLoginForm({email, password});
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        const user = new LoginRequest(
            email,
            password
        );

        try{
            const res = await LogIn(user);

            if(res.status == 200){
                //console.log(res.data);
                const tokenString = res.data.token;
                console.log(tokenString);
                login(tokenString);

                setEmail("");
                setPassword("");

                if (onSuccess) {
                    onSuccess();
                } else {
                    navigate("/");
                }
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
            {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}

            <button type="submit">Log in</button>
            <p style={{ marginTop: "15px" }}>
                No account? <Link to="/register">Regiser</Link>
            </p>
        </form>
    </div>
)
};