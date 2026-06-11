import { useEffect, useState, useContext } from "react";
import { GetAllUsers, DeleteUser } from "../../services/UserService";
import { AuthContext } from "../../context/auth/AuthContext";

export function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isAuthenticated, isLoading } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await GetAllUsers();
                console.log("Podaci iz API-ja:", data);
                setUsers(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Nije moguće učitati korisnike.");
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && user?.role === "ADMIN") {
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [user, isAuthenticated]);

    const handleDelete = async (id) => {
        if (window.confirm("Da li ste sigurni da želite obrisati ovog korisnika?")) {
            try {
                await DeleteUser(id);
                setUsers(users.filter((u) => u.id !== id));
            } catch (err) {
                alert("Greška pri brisanju korisnika.");
            }
        }
    };

    if (isLoading) return <p>Provjera autorizacije...</p>;

    if (!user || user.role !== "ADMIN") {
        return <p>Nemate pristup ovoj stranici!</p>;
    }

    if (loading) return <p>Učitavanje podataka...</p>;

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Lista korisnika</h2>
            <table>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Uloga</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                {Number(u.id) !== Number(user.id) ? (
                                    <button onClick={() => handleDelete(u.id)}>
                                        Obriši
                                    </button>
                                ) : (
                                    <span style={{ color: "gray", fontSize: "0.9em" }}>
                                        (Vi ste trenutno ulogovani)
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}