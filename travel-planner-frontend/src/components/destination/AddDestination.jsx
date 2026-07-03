import { useState, useEffect } from "react";
import { AddNewDestination } from "../../services/DestinationService";
import { useParams, useNavigate } from "react-router-dom";
import { DestinationRequest } from "../../models/dtos/CreateDestinationRequest";
import { ValidateCreateDestinationForm } from "../../validations/DestinationValidation";
import { GetPlanById } from "../../services/TravelService";

export function AddDestionation(){
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        arrivalDate: "",
        departureDate: "",
        description: "",
        travelPlanId: Number(id)
    });

    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [travelPlan, setTravelPlan] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));
    }

    useEffect(() => {
        console.log("useEffect se pokrenuo, ID je:", id);
        const fetchPlan = async () => {
            try {
                const plan = await GetPlanById(id); 
                console.log("Šta je stiglo sa servera:", plan);
                setTravelPlan(plan);
            } catch (err) {
                console.error("DETALJI GREŠKE:", err); 
                console.error("Poruka greške:", err.message);
            }
        };
        fetchPlan();
    }, [id]);

    const handleBlur = (e) => {
        const { name } = e.target;
        const validationErrors = ValidateCreateDestinationForm(formData, {
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

        const validationErrors = ValidateCreateDestinationForm(formData, {
            planStart: travelPlan.startDate, 
            planEnd: travelPlan.endDate
        });
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});

        const destination = new DestinationRequest(
            formData.name,
            formData.location,
            formData.arrivalDate,
            formData.departureDate,
            formData.description,
            Number(id)
        );

        try {
            await AddNewDestination(id, destination);
            console.log(formData);
            alert("Destinacija dodana!");
            navigate(`/travel-plans/${id}/destinations`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="login-container">
            <h2 style={{ textAlign: 'center' }}>Dodavanje nove destinacije</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Naziv destinacije:</label>
                    <input name="name" type="text" placeholder="Npr. Pariz" value={formData.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Lokacija:</label>
                    <input type="text" name="location" placeholder="Adresa ili regija" value={formData.location} onChange={handleChange} onBlur={handleBlur} />
                    {errors.location && <p className="error-text">{errors.location}</p>}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Datum dolaska:</label>
                        <input type="date" name="arrivalDate" min={travelPlan?.startDate.split("T")[0]} max={travelPlan?.endDate.split("T")[0]} value={formData.arrivalDate} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Datum polaska:</label>
                        <input type="date" name="departureDate" min={formData.arrivalDate || travelPlan?.startDate.split("T")[0]} max={travelPlan?.endDate.split("T")[0]} value={formData.departureDate} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                </div>
                {errors.arrivalDate && <p className="error-text">{errors.arrivalDate}</p>}
                {errors.departureDate && <p className="error-text">{errors.departureDate}</p>}

                <div className="form-group">
                    <label>Opis:</label>
                    <textarea name="description" placeholder="Unesite opis..." value={formData.description} onChange={handleChange} />
                    {errors.description && <p className="error-text">{errors.description}</p>}
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                    Dodaj destinaciju
                </button>
            </form>
        </div>
    );
}