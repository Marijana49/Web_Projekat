import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPlanById, EditTravelPlan } from "../../services/TravelService";
import { EditPlanRequest } from "../../models/dtos/EditPlanRequest";
import { ValidateEditPlanForm } from "../../validations/TravelPlanValidation";

export function EditTravelPlanForm(){
    const { id } = useParams();
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        notes: ""
    });

    useEffect(() => {
        async function fetchData(){
            const data = await GetPlanById(id);
            setFormData(data);
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const validationErrors = ValidateEditPlanForm({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validationErrors[name] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const plan = new EditPlanRequest(
            formData.name,
            formData.description,
            formData.startDate,
            formData.endDate,
            Number(formData.budget),
            formData.notes,
            Number(id)
        );

        try {
            await EditTravelPlan(id, plan);
            alert("Podaci su ažurirani!");
            navigate("/travel-plans");
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <h1>Ažuriraj plan putovanja</h1>
            <button type="button" onClick={() => navigate(`/travel-plans`)}>Nazad</button>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Naziv plana"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Opis plana"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && <span style={{color: 'red'}}>{errors.description}</span>}
                
                <input
                    type="date"
                    name="startDate"
                    min={today}
                    placeholder="Početni datum"
                    value={formData.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.startDate && <span style={{color: 'red'}}>{errors.startDate}</span>}

                <input
                    type="date"
                    name="endDate"
                    min={formData.startDate || today}
                    placeholder="Krajji datum"
                    value={formData.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.endDate && <span style={{color: 'red'}}>{errors.endDate}</span>}

                <input
                    type="number"
                    name="budget"
                    placeholder="Planirani budžet"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.budget && <span style={{color: 'red'}}>{errors.budget}</span>}

                <textarea
                    type="text"
                    name="notes"
                    placeholder="Bilješke"
                    value={formData.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.notes && <span style={{color: 'red'}}>{errors.notes}</span>}
                
                <button type="submit">Ažuriraj</button>
            </form>
        </>
    )
};