import axios from "axios";
import { GetValueByKey } from "../helpers/LocalStorage";
import { TRAVEL_API_URL } from "../helpers/ApiConfig";

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function AddNewDestination(id, destData){
    try{
        const res = await axios.post(`${TRAVEL_API_URL}/${id}`, destData, getAuthHeaders());
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
        const res = await axios.get(`${TRAVEL_API_URL}/destinations/plan/${id}`, headers);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function DeleteDestination(id){
    try{
        const res = await axios.delete(`${TRAVEL_API_URL}/destinations/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetDestinationById(id){
    try{
        const res = await axios.get(`${TRAVEL_API_URL}/destinations/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function EditDestination(id, destinationData) {
    try{
        const res = await axios.patch(`${TRAVEL_API_URL}/destinations/${id}`, destinationData, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}