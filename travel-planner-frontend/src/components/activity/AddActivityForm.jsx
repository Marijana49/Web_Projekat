import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ActivityStatus } from "../../enums/ActivityStatus";
import { AddNewActivity } from "../../services/ActivityService";
import { CreateActivityRequest } from "../../models/dtos/CreateActivityRequest";
import { useNavigate } from "react-router-dom";

export function AddActivityForm(){
    const { planId } = useParams();
    const [searchParams] = useSearchParams();
    const selectedDate = searchParams.get("date");
    const navigate = useNavigate();

    console.log("Datum iz URL-a:", selectedDate);

     const [formData, setFormData] = useState({
        name: "",
        date: selectedDate || "",
        time: "",
        location: "",
        description: "",
        budget: 100,
        status: ActivityStatus.PLANNED,
        travelPlanId: Number(planId)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));
    }

    const handleSubmit = async (e) => {
            e.preventDefault();
    
            //const d = new Date(formData.date);
            //const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

           const formattedDate = formData.date;

           const activity = new CreateActivityRequest(
                formData.name,
                formattedDate,
                formData.time,
                formData.location,
                formData.description,
                Number(formData.budget),
                Number(formData.status),
                formData.travelPlanId,
                null 
            );
    
            console.log(activity)
            try{
                await AddNewActivity(formData.travelPlanId, activity);
            } catch(error){
                alert("Greška prilikom kreiranja!");
            }
        }

    return(
    <>
     <h1>Add new activity</h1>
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
                    readOnly={!!selectedDate}
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
                <button type="submit">Create Activity</button>
            </form>
            <button onClick={() => navigate(`/activities/${planId}/${selectedDate}`)}>Preged aktivnosti</button>
        </>
    )
}