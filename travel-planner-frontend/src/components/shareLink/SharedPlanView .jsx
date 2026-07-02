import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ValidateShareToken } from "../../services/sharingService";
import { PlanDetails } from "../plan/PlanDetails" 

export const SharedPlanView = () => {
    const { token } = useParams();
    const [planId, setPlanId] = useState(null);
    const [accessType, setAccessType] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const validation = await ValidateShareToken(token);

                if (!validation.isValid) {
                    setError("Ovaj link je istekao ili ne postoji.");
                    return;
                }

                setPlanId(validation.planId);
                setAccessType(validation.accessType);
            } catch (err) {
                setError("Greška pri učitavanju plana.");
            }
        };
        load();
    }, [token]);

    if (error) return <p>{error}</p>;
    if (!planId) return <p>Učitavanje...</p>;

    return (
        <PlanDetails
            planId={planId}
            shareToken={token}
            readOnly={accessType === 0}
        />
    );
};