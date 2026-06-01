import axios from "axios";

const API_URL = import.meta.env.VITE_TRAVEL_API_URL;

export async function CreateTravelPlan(planData){
    try{
        const res = await axios.post(`${API_URL}/newPlan`, planData);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetAllTravelPlans(){
    try{
        const res = await axios.get(`${API_URL}/plans`);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetUserTravelPlans(id){
    try{
        const res = await axios.get(`${API_URL}/${id}/plans`);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function DeleteTravelPlan(id){
    try{
        const res = await axios.delete(`${API_URL}/deletePlan/${id}`);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetPlanById(id){
    try{
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
} 

export async function EditTravelPlan(id, planData){
    try{
        const res = await axios.patch(`${API_URL}/edit/${id}`, planData);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
};