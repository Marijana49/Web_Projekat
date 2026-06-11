import axios from "axios";
import { GetValueByKey } from "../helpers/LocalStorage";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    console.log(token);
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function DeleteUser(id){
    try{
        const res = await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetAllUsers(){
    console.log("Pozivam GetAllUsers");
    console.log("Zaglavlje:", getAuthHeaders());
    try{
        const res = await axios.get(`${API_URL}/users`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function ChangeUserRole(id, role){
    try{
        const res = await axios.patch(`${API_URL}/users/${id}`, role, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}