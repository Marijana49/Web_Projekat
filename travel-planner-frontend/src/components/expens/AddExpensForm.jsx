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

    const handleBlur = (e) => {
        const { name } = e.target;
        const validationErrors = ValidateCreateExpenseForm(formData, {
            planStart: travelPlan?.startDate, 
            planEnd: travelPlan?.endDate
        });
                
        setErrors(prev => ({
            ...prev,
            [name]: validationErrors[name]
        }));
    };

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
            navigate(`/travel-plans/${id}/details`);
        } catch(error){
            alert("Greška prilikom kreiranja!");
            }
        }
        
    return (
        <div className="login-container">
            <h2 style={{ textAlign: 'center' }}>Dodaj novi trošak</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Naziv troška:</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Npr. Ručak"
                        value={formData.name} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Iznos:</label>
                    <input 
                        type="number" 
                        name="amount" 
                        placeholder="0.00"
                        value={formData.amount} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.amount && <p className="error-text">{errors.amount}</p>}
                </div>

                <div className="form-group">
                <label>Kategorija:</label>
                <div className="category-grid">
                    {Object.entries(ExpenseCategory).map(([key, value]) => (
                        <label key={value} className="category-card">
                            <input 
                                type="radio" 
                                name="category" 
                                value={value} 
                                checked={Number(formData.category) === Number(value)}
                                onChange={handleChange} 
                            />
                            {ExpenseCategoryLabels[value]}
                        </label>
                    ))}
                </div>
            </div>

                <div className="form-group">
                    <label>Datum:</label>
                    <input 
                        type="date" 
                        name="date" 
                        min={travelPlan?.startDate}
                        max={travelPlan?.endDate}
                        value={formData.date} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}
                </div>

                <div className="form-group">
                    <label>Opis:</label>
                    <textarea 
                        name="description" 
                        placeholder="Dodatni detalji..."
                        value={formData.description} 
                        onChange={handleChange}
                        onBlur={handleBlur} 
                    />
                    {errors.description && <p className="error-text">{errors.description}</p>}
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                    Sačuvaj trošak
                </button>
            </form>
        </div>
    );
}