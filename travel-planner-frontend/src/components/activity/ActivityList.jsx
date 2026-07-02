import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { GetActivitiesByDate, DeleteActivity } from "../../services/ActivityService";
import { ActivityStatusLabels } from "../../enums/ActivityStatus";

export function ActivityList({ planId: externalPlanId, readOnly, selectedDate }) {
    console.log("ActivityList props:", { externalPlanId, readOnly, selectedDate });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { planId: urlPlanId } = useParams();
    const navigate = useNavigate();

    const activePlanId = externalPlanId || urlPlanId;

    useEffect(() => {
        if (!selectedDate || !activePlanId) return; 

        const fetchActivities = async () => {
            setLoading(true);
            try {
                const data = await GetActivitiesByDate(activePlanId, selectedDate);
                setActivities(data); 
            } catch (error) {
                console.error("Greška pri učitavanju aktivnosti:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [activePlanId, selectedDate]); 

    if (loading) return <p>Učitavanje aktivnosti...</p>;

    const handleDelete = async (id) => {
        if (window.confirm("Da li ste sigurni da želite da obrišete ovu aktivnost?")) {
            try {
                await DeleteActivity(id);
                setActivities(activities.filter(act => act.id !== id));
            } catch (error) {
                alert("Greška pri brisanju!");
            }
        }
    };

    return (
        <div className="activity-list">
            <h3>Aktivnosti za {selectedDate}</h3>
            {activities.length === 0 ? (
                <p>Nema planiranih aktivnosti za ovaj dan.</p>
            ) : (
                <ul>
                    {activities.map((act) => (
                        <li key={act.id}>
                            <strong>{act.time}</strong> - {act.name} ({act.location})
                            <span>{ActivityStatusLabels[act.status]}</span>
                            
                            {!readOnly && (
                                <>
                                    <button onClick={() => handleDelete(act.id)}>Obrisi</button>
                                    <button onClick={() => navigate(`/travel-plans/${activePlanId}/activities/edit`)}>Edit</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {!readOnly && (
                <button onClick={() => navigate(`/travel-plans/${activePlanId}/activities/new?date=${selectedDate}`)}>
                    Dodaj aktivnost
                </button>
            )}
        </div>
    );
}