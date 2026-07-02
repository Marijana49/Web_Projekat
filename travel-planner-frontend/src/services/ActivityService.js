import axios from "axios";
import { GetValueByKey } from "../helpers/LocalStorage";

const API_URL = import.meta.env.VITE_TRAVEL_API_URL;

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    console.log(token);
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function AddNewActivity(id, data){
    try{
        const res = await axios.post(`${API_URL}/activities/${id}`, data, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetActivitiesByDate(id, date, shareToken = null){
    try{
        const headers = shareToken 
            ? { headers: { "X-Share-Token": shareToken } }
            : getAuthHeaders();
        const res = await axios.get(`${API_URL}/activities/${id}/${date}`, headers);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function DeleteActivity(id){
    try{
        const res = await axios.delete(`${API_URL}/activities/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function EditActivity(id, activityData){
    try{
        const res = await axios.patch(`${API_URL}/activities/edit/${id}`, activityData, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetActivityById(id){
    try{
        const res = await axios.get(`${API_URL}/activities/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}