import { useState } from "react";
import { CreateShareLink, RevokeShareLink } from "../../services/SharingService";
import QRCode from "react-qr-code";

export const SharePlanModal = ({ planId, onClose }) => {
    const [accessType, setAccessType] = useState(0);
    const [shareLink, setShareLink] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        try{
            const res = await CreateShareLink(planId, accessType);
            const fullUrl = `${window.location.origin}/shared/${res.token}`;
            setShareLink({...res, fullUrl});
        } catch (error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async () => {
        try{
            await RevokeShareLink(shareLink.token);
            setShareLink(null);
        } catch (error){
            console.error(error);
        }
    };

    return (
        <div className="modal">
            <h3>Podijeli plan</h3>

            {!shareLink ? (
                <>
                    <label>
                        <input
                            type="radio"
                            value={0}
                            checked={accessType === 0}
                            onChange={() => setAccessType(0)}
                        />
                        View — pregled plana
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={1}
                            checked={accessType === 1}
                            onChange={() => setAccessType(1)}
                        />
                        Edit —  uredi plan
                    </label>
                    <button onClick={handleCreate} disabled={loading}>
                        {loading ? "Generišem..." : "Kreiraj link"}
                    </button>
                </>
            ) : (
                <>
                    <p>Tip pristupa: <strong>{shareLink.accessType === 0 ? "View" : "Edit"}</strong></p>
                    <p>Ističe: {new Date(shareLink.expiresAt).toLocaleDateString()}</p>

                    <input
                        type="text"
                        readOnly
                        value={shareLink.fullUrl}
                        onClick={e => e.target.select()}
                    />

                    <QRCode value={shareLink.fullUrl} size={180} />

                    <button onClick={handleRevoke}>Opozovi pristup</button>
                </>
            )}

            <button onClick={onClose}>Zatvori</button>
        </div>
    );
}