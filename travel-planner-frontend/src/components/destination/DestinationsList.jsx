import { useState, useEffect } from "react"
import { GetTravelPlanDestinations, DeleteDestination } from "../../services/DestinationService";
import { useParams, useNavigate } from "react-router-dom";

export function DestinationsList({ planId: externalPlanId, readOnly, shareToken }){
    const [destinations, setDestinations] = useState([]);
    const { id: paramId } = useParams();
    const id = externalPlanId || paramId;
    const navigate = useNavigate();

    useEffect(() => {
            async function loadData(){
                const data = await GetTravelPlanDestinations(id, shareToken);
                setDestinations(data);
            }
            loadData();
        }, [id]);

    const handleDelete = async (id) => {
        if(!window.confirm("Da li želite da obrišete ovu destinaciju?")) return;
    
        try{
            await DeleteDestination(id);
            alert("Destinacija obrisana!");
            setDestinations(prev => prev.filter(des => des.id !== id));
        } catch(error){
            console.log(error);
        }
    }

   return(
        <>
            <h2>Destinations for Travel Plans</h2>            
            {destinations.length === 0 ? (
                <p>No destinations created yet</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Arrival Date</th>
                            <th>Departure Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinations.map((des) => (
                            <tr key={des.id}>
                                <td>{des.name}</td>
                                <td>{des.location}</td>
                                <td>{des.arrivalDate}</td>
                                <td>{des.departureDate}</td>
                                <td>{des.description}</td>
                                <td>
                                {!readOnly && (
                                    <>
                                        <button onClick={() => navigate(`/destinations/${des.id}/edit`)}>
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(des.id)} 
                                            style={{ color: "red" }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}