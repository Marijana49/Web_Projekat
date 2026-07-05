import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ValidateShareToken } from "../../services/sharingService";
import { PlanDetails } from "../plan/PlanDetails";
import { useAuth } from "../../hooks/auth/UseAuthHook";
import { LogInForm } from "../auth/LogIn";

export const SharedPlanView = () => {
    const { token } = useParams();
    const [planId, setPlanId] = useState(null);
    const [accessType, setAccessType] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated, isLoading } = useAuth();

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

    if (error) return <p>{error}</p>;
    if (!planId || isLoading) return <p>Učitavanje...</p>;

    const isEditToken = accessType === 1;

    if (isEditToken && !isAuthenticated) {
        return (
            <div>
                <p>Ovaj link omogućava uređivanje plana. Morate se prijaviti da biste nastavili.</p>
                <LogInForm onSuccess={() => {}} />
            </div>
        );
    }

    const readOnly = !isEditToken || !isAuthenticated;

    return (
        <PlanDetails
            planId={planId}
            shareToken={token}
            readOnly={readOnly}
        />
    );
};