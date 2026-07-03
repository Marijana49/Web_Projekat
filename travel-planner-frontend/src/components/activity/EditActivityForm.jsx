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
            navigate(`/travel-plans/${planId}/details`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="login-container">
            <h1 style={{ textAlign: 'center' }}>Ažuriraj aktivnost</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Naziv aktivnosti:</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Datum:</label>
                        <input type="date" name="date" min={planDates.start} max={planDates.end} value={formData.date} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Vrijeme:</label>
                        <input type="time" name="time" value={formData.time} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                </div>
                {errors.date && <p className="error-text">{errors.date}</p>}
                {errors.time && <p className="error-text">{errors.time}</p>}

                <div className="form-group">
                    <label>Lokacija:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} onBlur={handleBlur} />
                    {errors.location && <p className="error-text">{errors.location}</p>}
                </div>

                <div className="form-group">
                    <label>Opis:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} onBlur={handleBlur} />
                </div>

                <div className="form-group">
                    <label>Budžet:</label>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} onBlur={handleBlur} />
                </div>

                <div className="form-group">
                <label>Status aktivnosti:</label>
                <div className="status-grid">
                    {Object.entries(ActivityStatus).map(([key, value]) => (
                        <label key={value} className="status-card">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    value={value} 
                                    checked={Number(formData.status) === Number(value)}
                                    onChange={handleChange} 
                                />
                                {key}
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '10px' }}>
                    Ažuriraj
                </button>
            </form>
        </div>
    )
}