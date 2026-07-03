import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ActivityStatus } from "../../enums/ActivityStatus";
import { AddNewActivity } from "../../services/ActivityService";
import { CreateActivityRequest } from "../../models/dtos/CreateActivityRequest";
import { useNavigate } from "react-router-dom";
import { ValidateCreateActivityForm } from "../../validations/ActivityValidation";
import { GetPlanById } from "../../services/TravelService";

export function AddActivityForm(){
    const { planId } = useParams();
    const [searchParams] = useSearchParams();
    const selectedDate = searchParams.get("date");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [travelPlan, setTravelPlan] = useState(null);

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

    useEffect(() => {
        console.log("useEffect se pokrenuo, ID je:", planId);
        const fetchPlan = async () => {
            try {
                const plan = await GetPlanById(planId); 
                console.log("Šta je stiglo sa servera:", plan);
                setTravelPlan(plan);
            } catch (err) {
                console.error("DETALJI GREŠKE:", err); 
                console.error("Poruka greške:", err.message);
            }
        };
        fetchPlan();
    }, [planId]);

    const handleBlur = (e) => {
        const { name } = e.target;
        const validationErrors = ValidateCreateActivityForm(formData, {
            planStart: travelPlan?.startDate, 
            planEnd: travelPlan?.endDate
        });
            
        setErrors(prev => ({
            ...prev,
            [name]: validationErrors[name]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateCreateActivityForm(formData, {
            planStart: travelPlan.startDate, 
            planEnd: travelPlan.endDate
        });
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});

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
                alert(`Nova aktivnost za dan ${formattedDate} dodana!`);
                navigate(`/travel-plans/${planId}/activities/${selectedDate}`);
            } catch(error){
                alert("Greška prilikom kreiranja!");
            }
        }

    return (
        <div className="login-container">
            <h1 style={{ textAlign: 'center' }}>Dodaj novu aktivnost</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Naziv aktivnosti:</label>
                    <input name="name" type="text" placeholder="Npr. Obilazak muzeja" value={formData.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Datum:</label>
                        <input type="date" name="date" value={formData.date} readOnly={!!selectedDate} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Vrijeme:</label>
                        <input type="time" name="time" value={formData.time} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Lokacija:</label>
                    <input type="text" name="location" placeholder="Adresa ili naziv mjesta" value={formData.location} onChange={handleChange} onBlur={handleBlur} />
                    {errors.location && <p className="error-text">{errors.location}</p>}
                </div>

                <div className="form-group">
                    <label>Opis:</label>
                    <textarea name="description" placeholder="Dodatne napomene..." value={formData.description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Budžet:</label>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} />
                </div>

                {/* Kartični stil za status */}
                <div className="form-group">
                    <label>Status:</label>
                    <div className="status-grid">
                        {Object.entries(ActivityStatus).map(([key, value]) => (
                            <label key={value} className="status-card">
                                <input type="radio" name="status" value={value} checked={Number(formData.status) === Number(value)} onChange={handleChange} />
                                {key}
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%', marginBottom: '10px' }}>
                    Dodaj aktivnost
                </button>
            </form>
        </div>
    );
}