import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ValidateShareToken } from "../../services/sharingService";
import { PlanDetails } from "../plan/PlanDetails";
import { GetSharedPlanPublic } from "../../services/TravelService";

export const SharedPlanView = () => {
    const { token } = useParams();
    const [planId, setPlanId] = useState(null);
    const [accessType, setAccessType] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const validate = async () => {
            try {
                const validation = await ValidateShareToken(token);
                if (!validation || !validation.isValid) {
                    setError("Ovaj link je istekao ili ne postoji.");
                    return;
                }
                setPlanId(validation.planId);
                setAccessType(validation.accessType);
            } catch (err) {
                setError("Greška pri validaciji.");
            }
        };
        validate();
    }, [token]);

    useEffect(() => {
        const fetchPlan = async () => {
            if (!planId) return; 
            
            try {
                const data = await GetSharedPlanPublic(planId, token);
                setPlanData(data); 
            } catch (err) {
                console.error("Greška pri učitavanju:", err);
                setError("Greška pri učitavanju plana.");
            }
        };
        fetchPlan();
    }, [planId, token]); 

    if (error) return <p>{error}</p>;
    if (!planId || !planData) return <p>Učitavanje podataka...</p>;

    return (
        <PlanDetails
            planId={planId}
            shareToken={token}
            readOnly={accessType === 0}
            initialData={planData} 
        />
    );
};