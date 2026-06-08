import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { GetDestinationById, EditDestination } from "../../services/DestinationService";
import { EditDestinationRequest } from "../../models/dtos/EditDestinationRequest";

export function EditDestinationForm(){
    const { id } = useParams();
    const [destination, setDestination] = useState(null);

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
            setFormData(data);
            setDestination(data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <h1>Edit destination</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Destination Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="arrivalDate"
                    min={today}
                    placeholder="Arrival Date"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="departureDate"
                    min={formData.arrivalDate || today}
                    placeholder="Deparature Date"
                    value={formData.departureDate}
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <button type="submit">Edit Destination</button>
            </form>
        </>
    )
}