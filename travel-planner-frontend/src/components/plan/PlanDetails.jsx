import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPlanById } from "../../services/TravelService"; 
import { DestinationsList } from "../destination/DestinationsList";
import { ActivityCalendar } from "../activity/ActivityCalendar";
import { useNavigate } from "react-router-dom";
import { ExpenseList } from "../expens/ExpenseList";
import { GetBudgetSummary } from "../../services/ExpenseService";

export function PlanDetails() {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [budgetData, setBudgetData] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetPlanById(id);
            setPlan(data);

            const summary = await GetBudgetSummary(id); 
            setBudgetData(summary);
        };
        fetchData();
    }, [id]);

    if (!plan || !budgetData) return <p>Učitavanje detalja plana...</p>;

    return (
        <div className="plan-details-container">
            <h1>{plan.name}</h1>
            <p>Budžet: {plan.budget} €</p>

            <div className="budget-summary">
                <p>Planirani budžet: {budgetData.budget} €</p>
                <p>Potrošeno: {budgetData.totalExpenses} €</p>
                <p style={{ color: budgetData.remainingBudget < 0 ? "red" : "green" }}>
                    Preostalo: {budgetData.remainingBudget} €
                </p>
            </div>

            <p style={{ color: budgetData.remainingBudget < 0 ? "red" : "green" }}>
                {budgetData.remainingBudget < 0 
                    ? `Prekoračenje budžeta: ${Math.abs(budgetData.remainingBudget)} €` 
                    : `Preostalo: ${budgetData.remainingBudget} €`}
            </p>

            <button onClick={() => navigate(`/travel-plans/${id}/expenses`)}>Dodaj trosak</button>

            <section className="card" style={{ marginTop: "20px" }}>
                <ExpenseList planId={id} budgetData={budgetData} />
            </section>

            <button onClick={() => navigate(`/travel-plans/${id}/checklists`)}>Checklist</button>

            <div className="dashboard-grid">
                <section className="card">
                    <h2>Destinacije</h2>
                    <DestinationsList planId={id} /> 
                </section>

                <section className="card">
                    <h2>Raspored aktivnosti</h2>
                    <ActivityCalendar planId={id} />
                </section>
            </div>
        </div>
    );
}