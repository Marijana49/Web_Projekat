import axios from "axios";

const API_URL = import.meta.env.VITE_TRAVEL_API_URL;

export async function AddNewDestination(id, destData){
    console.log("ŠTA ŠALJEMO NA BACKEND:", JSON.stringify(destData));
    try{
        const res = await axios.post(`${API_URL}/newDestination/${id}`, destData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
        console.log(res.data);
    } catch(error){
        console.log(error);
        console.error(error);
        throw error;
    }
}