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

    return(
        <>
            <h1>Add new destination</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Destination Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}

                <textarea
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                {errors.location && <p style={{ color: "red", fontSize: "12px" }}>{errors.location}</p>}

                <input
                    type="date"
                    name="arrivalDate"
                    min={today}
                    placeholder="Arrival Date"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                />
                {errors.arrivalDate && <p style={{ color: "red", fontSize: "12px" }}>{errors.arrivalDate}</p>}

                <input
                    type="date"
                    name="departureDate"
                    min={formData.startDate || today}
                    placeholder="Deparature Date"
                    value={formData.departureDate}
                    onChange={handleChange}
                />
                {errors.departureDate && <p style={{ color: "red", fontSize: "12px" }}>{errors.departureDate}</p>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <p style={{ color: "red", fontSize: "12px" }}>{errors.description}</p>}

                <button type="submit">Create Destination</button>
            </form>
        </>
    )
}