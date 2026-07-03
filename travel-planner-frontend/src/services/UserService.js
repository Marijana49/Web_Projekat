import axios from "axios";
import { GetValueByKey } from "../helpers/LocalStorage";
import { AUTH_API_URL } from "../helpers/ApiConfig";

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    console.log(token);
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function DeleteUser(id){
    try{
        const res = await axios.delete(`${AUTH_API_URL}/users/${id}`, getAuthHeaders());
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
        const res = await axios.get(`${AUTH_API_URL}/users`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function ChangeUserRole(id, role){
    try{
        const res = await axios.patch(`${AUTH_API_URL}/users/${id}`, { newRole: role }, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}