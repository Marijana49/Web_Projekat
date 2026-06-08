import { useState } from "react";

export function AddChecklistItemForm({ onAdd }) {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
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
                required
                style={{ 
                    flexGrow: 1, 
                    padding: "8px", 
                    borderRadius: "4px", 
                    border: "1px solid #ccc" 
                }}
            />
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