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

export const ValidateEditPlanForm = (values) => {
    let errors = {};

    if (values.name !== undefined && !values.name.trim()) {
        errors.name = "Unesite naziv plana putovanja!";
    }

    if (values.startDate && values.endDate) {
        if (new Date(values.endDate) < new Date(values.startDate)) {
            errors.endDate = "Datum završetka ne može biti prije datuma početka!";
        }
    }

    if (values.budget !== undefined && values.budget < 0) {
        errors.budget = "Unesite validnu vrijednost!";
    }

    if(values.notes !== undefined && values.notes.trim() === ""){
        errors.notes = "Unesite opis plana!";
    }

    if(values.description !== undefined && values.description.trim() === ""){
        errors.description = "Unesite opis plana!";
    }

    return errors;
};