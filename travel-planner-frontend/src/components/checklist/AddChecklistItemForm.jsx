import { useState } from "react";
import { ValidateChecklistForm } from "../../validations/ChecklistValidation";

export function AddChecklistItemForm({ onAdd }) {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});

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
        <form 
            onSubmit={handleSubmit} 
            style={{ 
                display: "flex", 
                gap: "10px", 
                marginBottom: "20px",
                padding: "10px",
                background: "#f9f9f9",
                borderRadius: "8px",
                border: "1px solid #ddd"
            }}
        >
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dodaj stavku (npr. Pasoš)..."
                style={{ 
                    flexGrow: 1, 
                    padding: "8px", 
                    borderRadius: "4px", 
                    border: "1px solid #ccc" 
                }}
            />
            {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}
            
            <button 
                type="submit"
                style={{ 
                    padding: "8px 16px", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer" 
                }}
            >
                Dodaj
            </button>
        </form>
    );
}