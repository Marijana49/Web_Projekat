import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { GetActivitiesByDate, DeleteActivity } from "../../services/ActivityService";
import { ActivityStatusLabels } from "../../enums/ActivityStatus";
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";

const numberedIcon = (number) =>
    L.divIcon({
        className: "numbered-marker",
        html: `<div class="marker-number">${number}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    });

function FitBounds({ coords }) {
    const map = useMap();

    useEffect(() => {
        if (coords.length === 0) return;
        const bounds = L.latLngBounds(coords);
        map.fitBounds(bounds, { padding: [40, 40] });
    }, [coords, map]);

    return null;
}

export function ActivityList({ planId: externalPlanId, readOnly, selectedDate: externalSelectedDate, shareToken }) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { planId: urlPlanId, selectedDate: urlSelectedDate } = useParams();
    const navigate = useNavigate();

    const activePlanId = externalPlanId || urlPlanId;
    const selectedDate = externalSelectedDate || urlSelectedDate;

    useEffect(() => {
        if (!selectedDate || !activePlanId) return; 

        const fetchActivities = async () => {
            setLoading(true);
            try {
                const data = await GetActivitiesByDate(activePlanId, selectedDate, shareToken);
                setActivities(data); 
            } catch (error) {
                console.error("Greška pri učitavanju aktivnosti:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();

        window.addEventListener("focus", fetchActivities);
        return () => window.removeEventListener("focus", fetchActivities);
    }, [activePlanId, selectedDate, shareToken]); 

    if (loading) return <p>Učitavanje aktivnosti...</p>;

    const handleDelete = async (id) => {
        if (window.confirm("Da li ste sigurni da želite da obrišete ovu aktivnost?")) {
            try {
                await DeleteActivity(id, shareToken);
                setActivities(activities.filter(act => act.id !== id));
            } catch (error) {
                alert("Greška pri brisanju!");
            }
        }
    };

    const buildEditUrl = (activityId) => {
        const base = `/travel-plans/${activePlanId}/activities/edit/${activityId}`;
        return shareToken ? `${base}?shareToken=${shareToken}` : base;
    };

    const mappableActivities = activities
        .filter((act) => act.latitude && act.longitude)
        .sort((a, b) => a.time.localeCompare(b.time));

    const routeCoords = mappableActivities.map((act) => [act.latitude, act.longitude]);

     return (
        <div className="activity-list">
            <h3>Aktivnosti za {selectedDate}</h3>

            {mappableActivities.length > 0 && (
                <div className="activity-map" style={{ height: "350px", marginBottom: "1rem" }}>
                    <MapContainer center={routeCoords[0]} zoom={13} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        {mappableActivities.map((act, index) => (
                            <Marker key={act.id} position={[act.latitude, act.longitude]} icon={numberedIcon(index + 1)}>
                                <Popup>
                                    <strong>{index + 1}. {act.name}</strong><br />
                                    {act.time} — {act.location}
                                </Popup>
                            </Marker>
                        ))}
                        <Polyline positions={routeCoords} color="blue" weight={3} />
                        <FitBounds coords={routeCoords} />
                    </MapContainer>
                </div>
            )}

            {activities.length === 0 ? (
                <p>Nema planiranih aktivnosti za ovaj dan.</p>
            ) : (
                <ul>
                    {activities.map((act) => (
                        <li key={act.id}>
                            <strong>{act.time}</strong> - {act.name} ({act.location})
                            <span className="activity-status">{ActivityStatusLabels[act.status]}</span>

                            {!readOnly && (
                                <div className="activity-actions">
                                    <button className="btn-secondary" onClick={() => navigate(buildEditUrl(act.id))}>Ažuriraj</button>
                                    <button className="btn-danger" onClick={() => handleDelete(act.id)}>Obriši</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {!readOnly && (
                <button className="btn-primary" onClick={() => navigate(`/travel-plans/${activePlanId}/activities/new?date=${selectedDate}`)}>
                    Dodaj aktivnost
                </button>
            )}
        </div>
    );
}