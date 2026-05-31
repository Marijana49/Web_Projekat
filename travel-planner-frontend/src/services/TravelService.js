import axios from "axios";

const API_URL = import.meta.env.VITE_TRAVEL_API_URL;

export async function CreateTravelPlan(planData){
    try{
        const res = await axios.post(`${API_URL}/newPlan`, planData);
        return res.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}

export async function GetAllTravelPlans(){
    try{
        const res = await axios.get(`${API_URL}/plans`);
        return res.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}

export async function GetUserTravelPlans(id){
    try{
        const res = await axios.get(`${API_URL}/${id}/plans`);
        return res.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}