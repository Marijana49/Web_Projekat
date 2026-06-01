import axios from "axios";

const API_URL = import.meta.env.VITE_TRAVEL_API_URL;

export async function AddNewDestination(id, destData){
    try{
        const res = await axios.post(`${API_URL}/newDestination/${id}`, destData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function GetTravelPlanDestinations(id){
    try{
        const res = await axios.get(`${API_URL}/destinations/${id}`);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function DeleteDestination(id){
    try{
        const res = await axios.delete(`${API_URL}/destination/${id}`);
        return res.data;
    } catch(error){
        console.error(error);
        throw error;
    }
}