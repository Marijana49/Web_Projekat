import { useState, useEffect } from "react"
import { GetTravelPlanDestinations, DeleteDestination } from "../../services/DestinationService";
import { useParams, useNavigate } from "react-router-dom";

export function DestinationsList(){
    const [destinations, setDestinations] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
            async function loadData(){
                const data = await GetTravelPlanDestinations(id);
                setDestinations(data);
            }
            loadData();
        }, []);

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
            <button type="button" onClick={() => navigate("/")}>Nazad</button>
            
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
                                    <button onClick={() => navigate(`/destinations/${des.id}/edit`)}>Edit</button>
                                    <button onClick={() => handleDelete(des.id)} style={{ color: "red" }}>Delete</button>                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}