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
        errors.description = "Unesite opis plana!";
    }

    if (arrivalDate && departureDate && planStart && planEnd) {
        if (new Date(arrivalDate) < new Date(planStart) || new Date(departureDate) > new Date(planEnd)) {
            errors.arrivalDate = `Destinacija mora biti između ${planStart} i ${planEnd}`;
        }
    }
    
    return errors;
};