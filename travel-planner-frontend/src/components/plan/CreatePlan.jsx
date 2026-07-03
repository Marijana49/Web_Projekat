import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTravelPlan } from "../../services/TravelService";
import { AuthContext } from "../../context/auth/AuthContext";
import { TravelPlanRequest } from "../../models/dtos/CreatePlanRequest";
import { ValidateCreatePlanForm } from "../../validations/TravelPlanValidation";

export function CreatePlan(){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: 100,
        notes: ""
    });
   
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        const validationErrors = ValidateCreatePlanForm(formData);
        
        setErrors(prev => ({
            ...prev,
            [name]: validationErrors[name]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateCreatePlanForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});

        const plan = new TravelPlanRequest(
            formData.name,
            formData.description,
            formData.startDate,
            formData.endDate,
            formData.budget,
            formData.notes,
            Number(user.id)
        );

        try{
            await CreateTravelPlan(plan);
            navigate("/");
        } catch(error){
            alert("Greška prilikom kreiranja!");
        }
    }

    return(
        <>
            <h1>Dodaj novi plan putovanja</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Naziv plana"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}

                <textarea
                    type="text"
                    name="description"
                    placeholder="Opis plana"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && <p style={{ color: "red", fontSize: "12px" }}>{errors.description}</p>}

                <input
                    type="date"
                    name="startDate"
                    min={today}
                    placeholder="Početni datum"
                    value={formData.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.startDate && <p style={{ color: "red", fontSize: "12px" }}>{errors.startDate}</p>}

                <input
                    type="date"
                    name="endDate"
                    min={formData.startDate || today}
                    placeholder="Krajnji datum"
                    value={formData.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.endDate && <p style={{ color: "red", fontSize: "12px" }}>{errors.endDate}</p>}

                <input
                    type="number"
                    name="budget"
                    placeholder="Planirani budžett"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.budget && <p style={{ color: "red", fontSize: "12px" }}>{errors.budget}</p>}

                <textarea
                    type="text"
                    name="notes"
                    placeholder="Bilješke"
                    value={formData.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.notes && <p style={{ color: "red", fontSize: "12px" }}>{errors.notes}</p>}

                <button type="submit">Dodaj</button>
            </form>
        </>
    )
}