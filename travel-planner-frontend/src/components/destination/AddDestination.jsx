import { useState } from "react";
import { AddNewDestination } from "../../services/DestinationService";
import { useParams, useNavigate } from "react-router-dom";

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AddNewDestination(id, formData);
            console.log(formData);
            alert("Destinacija dodana!");
            navigate(`/destinations/${id}`);
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
                    min={formData.startDate || today}
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
                <button type="submit">Create Destination</button>
            </form>
        </>
    )
}