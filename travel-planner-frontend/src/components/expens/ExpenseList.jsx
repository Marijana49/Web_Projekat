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

    return (
        <div>
            <h3>Pregled troškova</h3>
           
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