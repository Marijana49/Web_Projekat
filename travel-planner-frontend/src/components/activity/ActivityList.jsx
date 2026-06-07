import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom"; 
import { GetActivitiesByDate, DeleteActivity } from "../../services/ActivityService";
import { ActivityStatusLabels } from "../../enums/ActivityStatus";

export function ActivityList() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { planId, selectedDate } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(planId, selectedDate)
        if (!selectedDate) return; 

        const fetchActivities = async () => {
            setLoading(true);
            try {
                const data = await GetActivitiesByDate(planId, selectedDate);
                console.log(data)
                setActivities(data); 
            } catch (error) {
                console.error("Greška pri učitavanju aktivnosti:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [planId, selectedDate]); 

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
                            <span>
                                {ActivityStatusLabels[act.status]}
                            </span>
                            <button onClick={() => handleDelete(act.id)}>Obrisi</button>
                            <button onClick={() => navigate(`/activities/edit/${act.id}`)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}