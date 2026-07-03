import { useEffect, useState } from "react";
import { GetUserTravelPlans, DeleteTravelPlan, GetAllTravelPlans } from "../../services/TravelService";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { useNavigate } from "react-router-dom";
import App from "../../App";

export function TravelList (){
    const { user } = useAuth();
    const [ travelPlans, setTravelPlans ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.id) return;
        async function loadData(){
            let data;
            if(user.role === "ADMIN"){
                data = await GetAllTravelPlans();
            } else{
                data = await GetUserTravelPlans(user.id);
            }
            setTravelPlans(data);
        }
        loadData();
    }, [user]);

    const handleDelete = async (id) => {
        if(!window.confirm("Da li želite da obrišete ovaj plan?")) return;

        try{
            await DeleteTravelPlan(id);
            alert("Plan je obrisan!");
            setTravelPlans(prev => prev.filter(plan => plan.id !== id));
        } catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <h2>Lista planova putovanja</h2>
        {travelPlans.length === 0 ? (
            <p>Nemate kreiranih planova putovanja</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        {user.role === "ADMIN" && <th>Owner ID</th>}
                        <th>Opis plana</th>
                        <th>Početni datum</th>
                        <th>Krajnji datum</th>
                        <th>Planirani budžet</th>
                        <th>Bilješke</th>
                    </tr>
                </thead>
                <tbody>
                    {travelPlans.map((plan) => (
                        <tr key={plan.id}>
                            <td>{plan.name}</td>
                            {user.role === "ADMIN" && <td>{plan.userId}</td>}
                            <td>{plan.description}</td>
                            <td>{plan.startDate}</td>
                            <td>{plan.endDate}</td>
                            <td>{plan.budget}</td>
                            <td>{plan.notes}</td>
                            <td>
                                <button onClick={() => navigate(`/travel-plans/${plan.id}/details`)}> Pregled detalja</button>
                                <button onClick={() => navigate(`/travel-plans/${plan.id}`)}>Ažuriraj</button>
                                <button onClick={() => handleDelete(plan.id)} style={{ color: "red" }}>Obriši</button>
                                <button onClick={() => navigate(`/travel-plans/${plan.id}/destinations/new`)}>Dodaj destinaciju</button>
                                <button onClick={() => navigate(`/travel-plans/${plan.id}/destinations`)}>Pregledaj destinacije</button>
                                <button onClick={() => navigate(`/travel-plans/${plan.id}/calendars`)}>Otvori kalendar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}