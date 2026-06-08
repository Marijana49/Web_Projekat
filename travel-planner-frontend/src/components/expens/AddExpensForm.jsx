import { useState, useEffect } from "react";
import { AddNewExpens } from "../../services/ExpenseService";
import { useParams, useNavigate } from "react-router-dom";
import { ExpenseCategory, ExpenseCategoryLabels} from "../../enums/ExpenseCategory"
import { CreateExpenseRequest } from "../../models/dtos/CreateExpenseRequest";
import { ValidateCreateExpenseForm } from "../../validations/ExpenseValidation";
import { GetPlanById } from "../../services/TravelService";

export function AddExpensForm(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [travelPlan, setTravelPlan] = useState(null);

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

    useEffect(() => {
        console.log("useEffect se pokrenuo, ID je:", id);
        const fetchPlan = async () => {
            try {
                const plan = await GetPlanById(id); 
                console.log("Šta je stiglo sa servera:", plan);
                setTravelPlan(plan);
            } catch (err) {
                console.error("DETALJI GREŠKE:", err); 
                console.error("Poruka greške:", err.message);
            }
        };
        fetchPlan();
        }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateCreateExpenseForm(formData, {
            planStart: travelPlan.startDate, 
            planEnd: travelPlan.endDate
            });
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }
            setErrors({});
     
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
        <input type="text" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}

        <div>
        <label>Iznos:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        {errors.amount && <p style={{ color: "red", fontSize: "12px" }}>{errors.amount}</p>}

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
        {errors.category && <p style={{ color: "red", fontSize: "12px" }}>{errors.category}</p>}

        <div>
        <label>Datum:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        {errors.date && <p style={{ color: "red", fontSize: "12px" }}>{errors.date}</p>}

        <div>
        <label>Opis:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        {errors.description && <p style={{ color: "red", fontSize: "12px" }}>{errors.description}</p>}

        <button type="submit">Sačuvaj trošak</button>
    </form>
    );
}