import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPlanById, EditTravelPlan } from "../../services/TravelService";
import { EditPlanRequest } from "../../models/dtos/EditPlanRequest";
import { formToJSON } from "axios";

export function EditTravelPlanForm(){
    const { id } = useParams();
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        notes: ""
    });

    useEffect(() => {
        async function fetchData(){
            const data = await GetPlanById(id);
            setFormData(data);
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const plan = new EditPlanRequest(
            formData.name,
            formData.description,
            formData.startDate,
            formData.endDate,
            Number(formData.budget),
            formData.notes,
            Number(id)
        );

        try {
            await EditTravelPlan(id, plan);
            alert("Podaci su ažurirani!");
            navigate("/plans");
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <h1>Edit travel plan</h1>
            <button type="button" onClick={() => navigate(`/plans`)}>Nazad</button>
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
                <button type="submit">Edit Plan</button>
            </form>
        </>
    )
};