import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPlanById } from "../../services/TravelService"; 
import { DestinationsList } from "../destination/DestinationsList";
import { ActivityCalendar } from "../activity/ActivityCalendar";
import { useNavigate } from "react-router-dom";
import { ExpenseList } from "../expens/ExpenseList";
import { GetBudgetSummary } from "../../services/ExpenseService";
import { SharePlanModal } from "../shareLink/SharePlanModal";

export function PlanDetails({ readOnly = false, planId: externalPlanId, shareToken}) { 
    const { id: paramId } = useParams();
    const id = externalPlanId || paramId;
    const [plan, setPlan] = useState(null);
    const [budgetData, setBudgetData] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false); 
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetPlanById(id, shareToken);
            setPlan(data);
            const summary = await GetBudgetSummary(id); 
            setBudgetData(summary);
        };
        fetchData();
    }, [id]);

    if (!plan || !budgetData) return <p>Učitavanje detalja plana...</p>;

    return (
        <div className="plan-details-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>{plan.name}</h1>
                {!readOnly && (
                    <button onClick={() => setShowShareModal(true)}>
                        Podijeli plan
                    </button>
                )}
            </div>

            <div className="budget-summary">
                <p>Planirani budžet: {budgetData.budget} €</p>
                <p>Potrošeno: {budgetData.totalExpenses} €</p>
                <p style={{ color: budgetData.remainingBudget < 0 ? "red" : "green" }}>
                    Preostalo: {budgetData.remainingBudget} €
                </p>
            </div>

            {!readOnly && (
                <>
                    <button onClick={() => navigate(`/travel-plans/${id}/expenses`)}>
                        Dodaj trošak
                    </button>
                    <button onClick={() => navigate(`/travel-plans/${id}/checklists`)}>
                        Checklist za put
                    </button>
                </>
            )}

            <section className="card" style={{ marginTop: "20px" }}>
                <ExpenseList planId={id} budgetData={budgetData} readOnly={readOnly} shareToken={shareToken}/>
            </section>

            <div className="dashboard-grid">
                <section className="card">
                    <DestinationsList planId={id} readOnly={readOnly} shareToken={shareToken}/>
                </section>

                <section className="card">
                    <h2>Raspored aktivnosti</h2>
                    <ActivityCalendar planId={id} readOnly={readOnly} shareToken={shareToken}/>
                </section>
            </div>

            {showShareModal && (
                <SharePlanModal
                    planId={id}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </div>
    );
}