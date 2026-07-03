import axios from "axios";
import { GetValueByKey } from "../helpers/LocalStorage";
import { TRAVEL_API_URL } from "../helpers/ApiConfig";

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    console.log(token);
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function AddNewExpens(data){
    try{
        const res = await axios.post(`${TRAVEL_API_URL}/expenses`, data, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetAllExpensesByPlanId(id){
    try{
        const res = await axios.get(`${TRAVEL_API_URL}/expenses/${id}`, getAuthHeaders());
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetBudgetSummary(planId) {
    try {
        const response = await axios.get(`${TRAVEL_API_URL}/summary/${planId}`);
        return response.data;
    } catch (error) {
        console.error("Greška pri učitavanju budžeta:", error);
        return null;
    }
}