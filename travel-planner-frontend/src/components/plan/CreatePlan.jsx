import { useState } from "react";

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
            <h1>Create new travel plan</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Plan Name"
                    value={formData.name}
                    onChange={onChange}
                />
                <textarea
                    type="text"
                    placeholder="Plan Description"
                    value={formData.description}
                    onChange={onChange}
                />
                <input
                    type="date"
                    min={today}
                    placeholder="Start Date"
                    value={formData.startDate}
                    onChange={onChange}
                />
                <input
                    type="date"
                    min={startDate || today}
                    placeholder="End Date"
                    value={formData.endDate}
                    onChange={onChange}
                />
                <input
                    type="number"
                    placeholder="Planed budget"
                    value={formData.budget}
                    onChange={onChange}
                />
                <textarea
                    type="text"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={onChange}
                />
                <button type="submit">Create Plan</button>
            </form>
        </>
    )
}