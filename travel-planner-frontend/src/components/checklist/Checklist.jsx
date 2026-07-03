import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetChecklistByPlanId, UpdateChecklistItem, AddChecklistItem } from "../../services/ChecklistService";
import { AddChecklistItemForm } from "./AddChecklistItemForm"; 
import { CreateChecklist } from "../../models/dtos/CreateChecklistRequest";
import { EditChecklist } from "../../models/dtos/EditChecklistRequest";

export function Checklist() {
    const { id } = useParams(); 
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!id) return;
        const fetchItems = async () => {
            const data = await GetChecklistByPlanId(id);
            setItems(data);
        };
        fetchItems();
    }, [id]);

    const handleAdd = async (name) => {
        const newItem = new CreateChecklist( 
            name, 
            false,
            Number(id) 
        );

        await AddChecklistItem(id, newItem);
        const updatedList = await GetChecklistByPlanId(id)
        setItems(updatedList);
    };

    const toggleCheck = async (item) => {
        const updateItem = new EditChecklist(!item.isChecked, item.travelPlanId);
        await UpdateChecklistItem(item.id, updateItem);
        const updatedItem = { ...item, isChecked: !item.isChecked };
        setItems(items.map(i => i.id === item.id ? updatedItem : i));
    };

    return (
        <div className="checklist-container"> 
            <h3 className="checklist-title">Checklista</h3>
            
            <AddChecklistItemForm onAdd={handleAdd} />
            
            <ul className="checklist-ul">
                {items.map((item) => (
                    <li key={item.id} className="checklist-item">
                        <input 
                            type="checkbox" 
                            checked={item.isChecked} 
                            onChange={() => toggleCheck(item)} 
                        />
                        <span className={item.isChecked ? "checked-text" : ""}>
                            {item.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}