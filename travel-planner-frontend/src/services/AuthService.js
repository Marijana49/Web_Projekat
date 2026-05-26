import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export async function LogIn(email, password){
    try{
        const res = await axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        });

        return res.data;
    } catch (error){
        console.log(error);
        throw error
    }
}

export async function Register(name, email, password){
    try{
        const res = await axios.post(`${API_URL}/register`, {
             name,
            email,
            password
        });

        return res.data;
    } catch (error){
        console.log(error);
        throw error;
    }
}