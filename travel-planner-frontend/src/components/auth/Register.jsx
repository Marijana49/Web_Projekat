import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../../services/AuthService";
import { ReqisterRequest } from "../../models/dtos/RegisterRequest"

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export function RegisterForm(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">Register</button>
        </form>
        </>
    )
};