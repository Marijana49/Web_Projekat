import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { GetDestinationById, EditDestination } from "../../services/DestinationService";
import { EditDestinationRequest } from "../../models/dtos/EditDestinationRequest";
import { ValidateEditDestinationForm } from "../../validations/DestinationValidation";
import { GetPlanById } from "../../services/TravelService";

export function EditDestinationForm(){
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [errors, setErrors] = useState({});
    const [planDates, setPlanDates] = useState({ start: "", end: "" });

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        arrivalDate: "",
        departureDate: "",
        description: "",
    });

    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const data = await GetDestinationById(id);
            console.log("Podaci sa backenda:", data);
            const plan = await GetPlanById(data.travelPlanId);

            setFormData(data);
            setDestination(data);
            setPlanDates({
                start: plan.startDate.split("T")[0],
                end: plan.endDate.split("T")[0]
            });
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value 
        }));
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
            
        const validationErrors = ValidateEditDestinationForm(formData, planDates);
        
        setErrors(prev => {
            const newErrors = { ...prev };
                
            if (validationErrors[name]) {
                newErrors[name] = validationErrors[name];
            } else {
                delete newErrors[name];
            }
                
            return newErrors;
            });
        };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateEditDestinationForm(formData, planDates);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }

        setErrors({});

        const destination = new EditDestinationRequest(
            formData.name,
            formData.location,
            formData.arrivalDate,
            formData.departureDate,
            formData.description,
            Number(id)
        );

        try {
            await EditDestination(id, destination);
            alert("Destinacija ažurirana!");
            navigate(`/travel-plans/${formData.travelPlanId}/details`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="login-container">
            <h2 style={{ textAlign: 'center' }}>Ažuriraj destinaciju</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Naziv destinacije:</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Lokacija:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} onBlur={handleBlur} />
                    {errors.location && <p className="error-text">{errors.location}</p>}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Datum dolaska:</label>
                        <input type="date" name="arrivalDate" min={planDates.start} max={planDates.end} value={formData.arrivalDate} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Datum odlaska:</label>
                        <input type="date" name="departureDate" min={formData.arrivalDate || planDates.start} max={planDates.end} value={formData.departureDate} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                </div>
                {errors.arrivalDate && <p className="error-text">{errors.arrivalDate}</p>}
                {errors.departureDate && <p className="error-text">{errors.departureDate}</p>}

                <div className="form-group">
                    <label>Opis:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} onBlur={handleBlur} />
                    {errors.description && <p className="error-text">{errors.description}</p>}
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                    Ažuriraj destinaciju
                </button>
            </form>
        </div>
    );
}