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
            setErrors({ form: "Neuspješna prijava. Provjerite podatke." });
        }
    };

return (
    <div className="login-container">
        <h1>Prijava</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
                type="password"
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            {errors.form && <p className="error-text" style={{textAlign: 'center'}}>{errors.form}</p>}

            <button type="submit">Prijavi se</button>
            <p style={{ marginTop: "15px" }}>
                Nemate nalog? <Link to="/register">Registruj se</Link>
            </p>
        </form>
    </div>
)
};