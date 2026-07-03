export const ValidateCreateDestinationForm = (values, planDates) => {
    let errors = {};
    const { arrivalDate, departureDate } = values;
    const { planStart, planEnd } = planDates;

    if (!values.name) {
        errors.name = "Unesite naziv destinacije!";
    }
    
    if (!values.location) {
        errors.location = "Unesite lokaciju destinacije!";
    } 

    if (values.arrivalDate && values.departureDate) {
        if (new Date(values.departureDate) < new Date(values.arrivalDate)) {
            errors.departureDate = "Datum završetka ne može biti prije datuma početka!";
        }
    } else {
        if (!values.arrivalDate) errors.arrivalDate = "Početni datum je obavezan";
        if (!values.departureDate) errors.departureDate = "Krajnji datum je obavezan";
    }
    
    if (!values.description) {
        errors.description = "Unesite opis!";
    }

    if (arrivalDate && departureDate && planStart && planEnd) {
        if (new Date(arrivalDate) < new Date(planStart) || new Date(departureDate) > new Date(planEnd)) {
            errors.arrivalDate = `Destinacija mora biti između ${planStart} i ${planEnd}`;
        }
    }
    
    return errors;
};

export const ValidateEditDestinationForm = (values, planDates) => {
    let errors = {};

    if (values.name !== undefined && !values.name.trim()) {
        errors.name = "Unesite naziv!";
    }

   if (planDates && values.arrivalDate && values.departureDate) {
        const start = new Date(planDates.start);
        const end = new Date(planDates.end);
        const arrival = new Date(values.arrivalDate);
        const departure = new Date(values.departureDate);

        if (arrival < start || departure > end) {
            errors.arrivalDate = `Datum mora biti između ${planDates.start} i ${planDates.end}`;
        }
        
        if (departure < arrival) {
            errors.departureDate = "Datum odlaska ne može biti prije dolaska!";
        }
    }

    if(values.location !== undefined && values.location.trim() === ""){
        errors.location = "Unesite lokaciju!";
    }

    if(values.description !== undefined && values.description.trim() === ""){
        errors.description = "Unesite opis!";
    }

    return errors;
};