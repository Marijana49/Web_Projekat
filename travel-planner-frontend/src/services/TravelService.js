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

export async function CreateTravelPlan(planData){
    try{
        const res = await axios.post(`${API_URL}/newPlan`, planData, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetAllTravelPlans(){
    try{
        const res = await axios.get(`${API_URL}/plans`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetUserTravelPlans(id){
    try{
        const res = await axios.get(`${API_URL}/${id}/plans`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function DeleteTravelPlan(id){
    try{
        const res = await axios.delete(`${API_URL}/deletePlan/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetPlanById(id, shareToken = null){
    try{
        const headers = shareToken 
            ? { headers: { "X-Share-Token": shareToken } }
            : getAuthHeaders();
        const res = await axios.get(`${API_URL}/${id}`, headers);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
} 

export async function EditTravelPlan(id, planData){
    try{
        const res = await axios.patch(`${API_URL}/edit/${id}`, planData, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
};

export const GetSharedPlanPublic = async (planId, shareToken) => {
    try {
        const response = await axios.get(`${API_URL}/${planId}`, {
            headers: {
                'X-Share-Token': shareToken,
                'Authorization': undefined 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Direktni zahtev nije uspeo:", error);
        throw error;
    }
};