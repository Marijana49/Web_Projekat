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
            <h2>Destinacije plana putovanja</h2>            
            {destinations.length === 0 ? (
                <p>Trenutno nemate destinacije za ovaj plan</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Lokacija</th>
                            <th>Datum dolaska</th>
                            <th>Datum odlaska</th>
                            <th>Opis</th>
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
                                            Ažuriraj
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(des.id)} 
                                            style={{ color: "red" }}
                                        >
                                            Obriši
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