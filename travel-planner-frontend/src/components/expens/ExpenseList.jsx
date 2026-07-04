import { useEffect, useState } from "react";
import { GetAllExpensesByPlanId } from "../../services/ExpenseService";
import { ExpenseCategoryLabels } from "../../enums/ExpenseCategory";

export function ExpenseList({ planId, totalBudget, readOnly, shareToken }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await GetAllExpensesByPlanId(planId, shareToken);
            setExpenses(data);
        };
        fetchExpenses();
    }, [planId, shareToken]);

    const groupByCategory = expenses.reduce((acc, exp) => {
        const category = exp.category;
        if(!acc[category]){
            acc[category] = 0;
        }
        acc[category] += exp.amount;
        return acc;
    }, {});

    return (
        <div>
            <h3>Pregled troškova</h3>

            {expenses.length > 0 && (
                <div className="category-summary">
                    {Object.entries(groupByCategory).map(([category, total]) => (
                        <div key={category} className="category-summary-item">
                            <span>{ExpenseCategoryLabels[category]}: </span>
                            <strong>{total.toFixed(2)} €</strong>
                        </div>
                    ))}
                </div>
            )}
           
            <table border="1" style={{ width: "100%", marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Kategorija</th>
                        <th>Iznos</th>
                        <th>Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp) => (
                        <tr key={exp.id}>
                            <td>{exp.name}</td>
                            <td>{ExpenseCategoryLabels[exp.category]}</td> 
                            <td>{exp.amount} €</td>
                            <td>{new Date(exp.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}