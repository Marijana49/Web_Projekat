import axios from "axios";
import { GetValueByKey } from "../helpers/LocalStorage";

const API_URL = import.meta.env.VITE_TRAVEL_API_URL;

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function AddNewDestination(id, destData){
    try{
        const res = await axios.post(`${API_URL}/newDestination/${id}`, destData, getAuthHeaders());
        return res;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetTravelPlanDestinations(id, shareToken = null){
    try{
        const headers = shareToken 
            ? { headers: { "X-Share-Token": shareToken } }
            : getAuthHeaders();
        const res = await axios.get(`${API_URL}/travel-plans/destinations/${id}`, headers);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function DeleteDestination(id){
    try{
        const res = await axios.delete(`${API_URL}/destinations/delete/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetDestinationById(id){
    try{
        const res = await axios.get(`${API_URL}/destinations/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function EditDestination(id, destinationData) {
    try{
        const res = await axios.patch(`${API_URL}/destinations/edit/${id}`, destinationData, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}