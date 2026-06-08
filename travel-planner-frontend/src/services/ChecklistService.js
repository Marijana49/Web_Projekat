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

export async function GetChecklistByPlanId(id) {
    try{
        const res = await axios.get(`${API_URL}/checklists/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function UpdateChecklistItem(id, isChecked) {
    try{
        const res = await axios.patch(`${API_URL}/checklists/${id}`, isChecked, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function AddChecklistItem(planId, data) {
    try {
        const res = await axios.post(`${API_URL}/checklists/${planId}`, data, getAuthHeaders());
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}