import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export async function LogIn(data){
    try{
        const res = await axios.post(`${API_URL}/login`, data);
        return res;
    } catch (error){
        console.log(error);
        throw error
    }
}

export async function Register(data){
    try{
        const res = await axios.post(`${API_URL}/register`, data);
        return res;
    } catch (error){
        console.log(error);
        throw error;
    }
}