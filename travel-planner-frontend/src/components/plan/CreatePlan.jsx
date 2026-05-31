import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTravelPlan } from "../../services/TravelService";
import { AuthContext } from "../../context/auth/AuthContext";

export function CreatePlan(){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: 100,
        notes: ""
    });
   
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            userId: Number(user.id) 
        };

        try{
            await CreateTravelPlan(dataToSend);
            navigate("/");
        } catch(error){
            alert("Greška prilikom kreiranja!");
        }
    }

    return(
        <>
            <h1>Create new travel plan</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Plan Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Plan Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="startDate"
                    min={today}
                    placeholder="Start Date"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="endDate"
                    min={formData.startDate || today}
                    placeholder="End Date"
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="budget"
                    placeholder="Planed budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
                <button type="submit">Create Plan</button>
            </form>
        </>
    )
}