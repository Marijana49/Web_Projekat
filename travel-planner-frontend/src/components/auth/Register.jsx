import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../../services/AuthService";
import { ReqisterRequest } from "../../models/dtos/RegisterRequest"
import { ValidateRegisterForm } from "../../validations/AuthValidation";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export function RegisterForm(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateRegisterForm({name, email, password});
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        setErrors({});

        const user = new ReqisterRequest(
            name,
            email,
            password
        );

        try{
            const res = await Register(user);

            if(res.status == 200 || res.status == 201){
                console.log(res.data);

                const loginRes = await axios.post(`${API_URL}/login`, {
                    email: email,
                    password: password
                });

                if(loginRes.status == 200){
                    const tokenString = loginRes.data.token;

                    login(tokenString);
                    navigate("/");
                }
            }
        } catch(error){
            console.log(error);
        }
    }

    return(
        <div className="login-container">
        <h1>Registracija</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ime"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

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

            <button type="submit">Registruj se</button>

            <p>
                Već imate nalog? <Link to="/login">Prijavi se</Link>
            </p>
        </form>
        </div>
    )
};