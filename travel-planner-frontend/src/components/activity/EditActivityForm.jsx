import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetActivityById, EditActivity } from "../../services/ActivityService";
import { EditActivityRequest } from "../../models/dtos/EditActivityRequest";
import { ActivityStatus } from "../../enums/ActivityStatus";

export function EditActivityForm(){
    const { planId, selectedDate } = useParams();
    const [activity, setActivity] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        budget: 0,
        status: null
    });

    useEffect(() => {
        async function fetchData(){
            const data = await GetActivityById(planId);
            console.log("Podaci sa backenda:", data);
            setFormData(data);
            setActivity(data);
        }
        fetchData();
    }, [planId]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value 
    }));
}

    const handleSubmit = async (e) => {
        e.preventDefault();

        const activityData = new EditActivityRequest(
            formData.name,
            formData.date,
            formData.time,
            formData.location,
            formData.description,
            formData.budget,
            Number(formData.status), 
            Number(planId),  
            null             
        );

        try {
            await EditActivity(planId, activityData);
            alert("Aktivnost ažurirana!");
           // navigate(`/travel-plans/destinations/${formData.travelPlanId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <h1>Edit activity</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Activity Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                />
                <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="budget"
                    placeholder="Planed budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    {Object.entries(ActivityStatus).map(([key, value]) => (
                        <option key={value} value={value}>
                            {key} 
                        </option>
                    ))}
                </select>
                <button type="submit">Edit Activity</button>
            </form>
        </>
    )
}