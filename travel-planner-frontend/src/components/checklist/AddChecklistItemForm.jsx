import { useState } from "react";
import { ValidateChecklistForm } from "../../validations/ChecklistValidation";

export function AddChecklistItemForm({ onAdd }) {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});

    const handleBlur = () => {
        const validationErrors = ValidateChecklistForm({ name });
        
        setErrors(validationErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateChecklistForm({name});
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});

        await onAdd(name);
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className="checklist-add-form">
            <div className="input-row">
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="Dodaj stavku (npr. Pasoš)..."
                    className="checklist-input"
                />
                <button type="submit" className="add-btn">
                    Dodaj
                </button>
            </div>
            {errors.name && <p className="error-text" style={{ margin: 0 }}>{errors.name}</p>}
        </form>
    );
}