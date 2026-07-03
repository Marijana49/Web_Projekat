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
        <div className="login-container">
            <h1>Ažuriraj plan putovanja</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Naziv plana"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Opis plana"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && <p className="error-text">{errors.description}</p>}
                
                <input
                    type="date"
                    name="startDate"
                    min={today}
                    placeholder="Početni datum"
                    value={formData.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.startDate && <p className="error-text">{errors.startDate}</p>}

                <input
                    type="date"
                    name="endDate"
                    min={formData.startDate || today}
                    placeholder="Krajji datum"
                    value={formData.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.endDate && <p className="error-text">{errors.endDate}</p>}

                <input
                    type="number"
                    name="budget"
                    placeholder="Planirani budžet"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.budget && <p className="error-text">{errors.budget}</p>}

                <textarea
                    type="text"
                    name="notes"
                    placeholder="Bilješke"
                    value={formData.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.notes && <p className="error-text">{errors.notes}</p>}
                
                <button type="submit" className="primary-btn">Ažuriraj</button>
            </form>
        </div>
    )
};