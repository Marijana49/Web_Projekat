import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ValidateShareToken } from "../../services/sharingService";
import { GetPlanById } from "../../services/travelService";
import { PlanDetails } from "../plan/PlanDetails" 

export const SharedPlanView = () => {
    const { token } = useParams();
    const [planData, setPlanData] = useState(null);
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

                const plan = await GetPlanById(validation.planId);
                setPlanData(plan);
                setAccessType(validation.accessType);

            } catch (err) {
                setError("Greška pri učitavanju plana.");
            }
        };
        load();
    }, [token]);

    if (error) return <p>{error}</p>;
    if (!planData) return <p>Učitavanje...</p>;

    return (
        <PlanDetails
            plan={validation.planId}
            readOnly={accessType === 0}  
        />
    );
};