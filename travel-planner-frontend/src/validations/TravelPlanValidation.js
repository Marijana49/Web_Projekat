export const ValidateCreatePlanForm = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = "Unesite naziv plana putovanja!";
    } 

    if (!values.description) {
        errors.description = "Unesite opis plana!";
    }
    
    if (values.startDate && values.endDate) {
        if (new Date(values.endDate) < new Date(values.startDate)) {
            errors.endDate = "Datum završetka ne može biti prije datuma početka!";
        }
    } else {
        if (!values.startDate) errors.startDate = "Početni datum je obavezan";
        if (!values.endDate) errors.endDate = "Krajnji datum je obavezan";
    }

    if(values.budget < 0){
        errors.budget = "Unesite validnu vrijednost!";
    }

    if(!values.notes){
        errors.notes = " Unesite bilješke za plan!";
    }

    return errors;
};