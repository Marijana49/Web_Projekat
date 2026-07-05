import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPlanById } from "../../services/TravelService"; 
import { DestinationsList } from "../destination/DestinationsList";
import { ActivityCalendar } from "../activity/ActivityCalendar";
import { useNavigate } from "react-router-dom";
import { ExpenseList } from "../expens/ExpenseList";
import { GetBudgetSummary } from "../../services/ExpenseService";
import { SharePlanModal } from "../shareLink/SharePlanModal";
import { GeneratePlanPdf } from "../../helpers/GeneratePlanPdf";
import { useAuth } from "../../hooks/auth/UseAuthHook";

export function PlanDetails({ readOnly = false, planId: externalPlanId, shareToken}) { 
    const { id: paramId } = useParams();
    const id = externalPlanId || paramId;
    const [plan, setPlan] = useState(null);
    const [budgetData, setBudgetData] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false); 
    const navigate = useNavigate();
    const { user } = useAuth();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetPlanById(id, shareToken);
            setPlan(data);
            const summary = await GetBudgetSummary(id, shareToken); 
            setBudgetData(summary);
        };
        fetchData();
    }, [id, shareToken]);

    const handleExportPdf  =  async () => {
        try{
            await GeneratePlanPdf(id, shareToken);
        } catch (error){
            console.error("Greška pri generisanju PDF-a:", error);
            alert("Generisanje PDF-a nije uspjelo.");
        }
    }

    if (!plan || !budgetData) return <p>Učitavanje detalja plana...</p>;
    console.log("plan:", plan);
    console.log("user:", user);

    const isOwner = user && Number(user.id) === Number(plan.userId);
    console.log("isOwner:", isOwner);
    
    return (
        <div className="plan-details-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>{plan.name}</h1>
                {isOwner && (
                    <button className="btn-primary" onClick={() => setShowShareModal(true)}>
                        Podijeli plan
                    </button>
                )}
            </div>

            {isOwner && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {!readOnly && (
                    <button className="btn-danger" onClick={handleExportPdf}>PDF izvještaj</button>
                )}
            </div>
            )}

            <div className="budget-summary">
                <p>Planirani budžet: {budgetData.budget} €</p>
                <p>Potrošeno: {budgetData.totalExpenses} €</p>
                <p style={{ color: budgetData.remainingBudget < 0 ? "red" : "green" }}>
                    Preostalo: {budgetData.remainingBudget} €
                </p>
            </div>

            {isOwner && (
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