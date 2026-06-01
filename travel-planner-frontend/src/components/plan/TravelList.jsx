import { useEffect, useState } from "react";
import { GetUserTravelPlans, DeleteTravelPlan } from "../../services/TravelService";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { useNavigate } from "react-router-dom";

export function TravelList ({ onEdit}){
    const { user } = useAuth();
    const [ travelPlans, setTravelPlans ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.id) return;
        async function loadData(){
            const data = await GetUserTravelPlans(user.id);
            setTravelPlans(data);
        }
        loadData();
    }, [user]);

    const handleDelete = async (id) => {
        if(!window.confirm("Da li želite da obrišete ovaj plan?")) return;

        try{
            await DeleteTravelPlan(id);
            setTravelPlans(prev => prev.filter(plan => plan.id !== id));
        } catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <h2>List of Travel Plans</h2>
        {travelPlans.length === 0 ? (
            <p>No plans created yet</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {travelPlans.map((plan) => (
                        <tr key={plan.id}>
                            <td>{plan.name}</td>
                            <td>{plan.description}</td>
                            <td>{plan.startDate}</td>
                            <td>{plan.endDate}</td>
                            <td>{plan.budget}</td>
                            <td>
                                <button onClick={() => navigate(`/edit/${plan.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(plan.id)} style={{ color: "red" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}