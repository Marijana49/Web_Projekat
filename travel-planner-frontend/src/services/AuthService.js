import axios from 'axios';
import { AUTH_API_URL } from '../helpers/ApiConfig';

export async function LogIn(data){
    try{
        const res = await axios.post(`${AUTH_API_URL}/login`, data);
        return res;
    } catch (error){
        console.log(error);
        throw error
    }
}

export async function Register(data){
    try{
        const res = await axios.post(`${AUTH_API_URL}/register`, data);
        return res;
    } catch (error){
        console.log(error);
        if (error.response && error.response.status === 409) {
            throw new Error("Email je već zauzet!"); 
        }
        throw error;
    }
}