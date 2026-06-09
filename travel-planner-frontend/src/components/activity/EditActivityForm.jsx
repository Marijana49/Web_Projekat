import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetActivityById, EditActivity } from "../../services/ActivityService";
import { EditActivityRequest } from "../../models/dtos/EditActivityRequest";
import { ActivityStatus } from "../../enums/ActivityStatus";
import { GetPlanById } from "../../services/TravelService";
import { ValidateEditActivityForm } from "../../validations/ActivityValidation";

export function EditActivityForm(){
    const { planId, selectedDate } = useParams();
    const [activity, setActivity] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [planDates, setPlanDates] = useState({ start: "", end: "" });

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

            const plan = await GetPlanById(data.travelPlanId);

            setPlanDates({ start: plan.startDate, end: plan.endDate });
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

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const validationErrors = ValidateEditActivityForm({ ...formData, [name]: value }, planDates);
        
        setErrors(prev => {
            const next = { ...prev };
            if (validationErrors[name]) {
                next[name] = validationErrors[name];
            } else {
                delete next[name];
            }
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateEditActivityForm(formData, planDates);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            alert("Ispravite greške u formi!");
            return;
        }

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
                    onBlur={handleBlur}
                />
                {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}

                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.date && <span style={{color: 'red'}}>{errors.date}</span>}

                <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.time && <span style={{color: 'red'}}>{errors.time}</span>}

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.location && <span style={{color: 'red'}}>{errors.location}</span>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && <span style={{color: 'red'}}>{errors.description}</span>}

                <input
                    type="number"
                    name="budget"
                    placeholder="Planed budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.budget && <span style={{color: 'red'}}>{errors.budget}</span>}

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