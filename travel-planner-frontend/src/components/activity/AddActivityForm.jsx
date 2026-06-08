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
                {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}

                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    readOnly={!!selectedDate}
                />
                {errors.date && <p style={{ color: "red", fontSize: "12px" }}>{errors.date}</p>}

                <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                />
                {errors.time && <p style={{ color: "red", fontSize: "12px" }}>{errors.time}</p>}

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                {errors.location && <p style={{ color: "red", fontSize: "12px" }}>{errors.location}</p>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <p style={{ color: "red", fontSize: "12px" }}>{errors.description}</p>}

                <input
                    type="number"
                    name="budget"
                    placeholder="Planed budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
                {errors.budget && <p style={{ color: "red", fontSize: "12px" }}>{errors.budget}</p>}

                <button type="submit">Create Activity</button>
            </form>
            <button onClick={() => navigate(`/travel-plans/${planId}/activities/${selectedDate}`)}>Preged aktivnosti</button>
        </>
    )
}