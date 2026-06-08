import { useState } from "react";
import { AddNewExpens } from "../../services/ExpenseService";
import { useParams, useNavigate } from "react-router-dom";
import { ExpenseCategory, ExpenseCategoryLabels} from "../../enums/ExpenseCategory"
import { CreateExpenseRequest } from "../../models/dtos/CreateExpenseRequest";

export function AddExpensForm(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        amount: 0,
        category: 0,
        date: "",
        description: "",
        travelPlanId: Number(id)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        const formattedDate = formData.date;
    
        const expens = new CreateExpenseRequest(
            formData.name,
            formData.amount,
            Number(formData.category),
            formData.date,
            formData.description,
            Number(id)
        )
        
        console.log(expens)
        try{
            await AddNewExpens(expens);
            alert(`Trošak je dodat!`);
        } catch(error){
            alert("Greška prilikom kreiranja!");
            }
        }
        
    return (
    <form onSubmit={handleSubmit}>
        <h3>Dodaj novi trošak</h3>

        <div>
        <label>Naziv troška:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
        <label>Iznos:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>

        <div>
        <label>Kategorija:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
            {Object.entries(ExpenseCategory).map(([key, value]) => (
            <option key={value} value={value}>
                {ExpenseCategoryLabels[value]}
            </option>
            ))}
        </select>
        </div>

        <div>
        <label>Datum:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div>
        <label>Opis:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <button type="submit">Sačuvaj trošak</button>
    </form>
    );
}