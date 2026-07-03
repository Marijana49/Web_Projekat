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
            navigate(`/travel-plans/${formData.travelPlanId}/destinations`);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <h1>Ažurirajte destinaciju</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Naziv destinacije"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}

                <textarea
                    type="text"
                    name="location"
                    placeholder="Lokacija"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.location && <span style={{color: 'red'}}>{errors.location}</span>}

                <input
                    type="date"
                    name="arrivalDate"
                    //min={today}
                    min={planDates.start} 
                    max={planDates.end}
                    placeholder="Datum dolaska"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.arrivalDate && <span style={{color: 'red'}}>{errors.arrivalDate}</span>}

                <input
                    type="date"
                    name="departureDate"
                    //min={formData.arrivalDate || today}
                    min={formData.arrivalDate || planDates.start} 
                    max={planDates.end}
                    placeholder="Datum odlaska"
                    value={formData.departureDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.departureDate && <span style={{color: 'red'}}>{errors.departureDate}</span>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Opis"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && <span style={{color: 'red'}}>{errors.description}</span>}

                <button type="submit">Ažuriraj</button>
            </form>
        </>
    )
}