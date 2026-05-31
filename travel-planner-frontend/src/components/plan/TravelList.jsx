import { useEffect, useState } from "react";
import { GetUserTravelPlans } from "../../services/TravelService";
import { useAuth } from "../../hooks/auth/UseAuthHook";

export function TravelList ({ onDelete, onEdit, onViewDetails}){
    const { user } = useAuth();
    const [ travelPlans, setTravelPlans ] = useState([]);

    useEffect(() => {
        if (!user || !user.id) return;
        async function loadData(){
            const data = await GetUserTravelPlans(user.id);
            setTravelPlans(data);
        }
        loadData();
    }, [user]);

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
                                <button onClick={() => onViewDetails(plan)}>Details</button>
                                <button onClick={() => onEdit(plan)}>Edit</button>
                                <button onClick={() => onDelete(plan.id)} style={{ color: "red" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}