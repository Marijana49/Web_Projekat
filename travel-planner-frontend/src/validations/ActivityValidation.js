export const ValidateCreateActivityForm = (values, planDates) => {
    let errors = {};
    const { planStart, planEnd } = planDates;

    if (!values.name) {
        errors.name = "Unesite naziv destinacije!";
    }
    
    if (!values.location) {
        errors.location = "Unesite lokaciju destinacije!";
    } 

    if (!values.date) {
       errors.date = "Unesite datum!";
    }
    
    if(!values.time){
        errors.time = "Unesite vrijeme!";
    }
    
    if (!values.location) {
        errors.location = "Unesite lokaciju destinacije!";
    } 

    if (!values.description) {
        errors.description = "Unesite opis plana!";
    }

    if(values.budget <= 0){
        errors.budget = "Unesite validnu vrijednost!";
    }

    if(values.date && planStart && planEnd){
        const activityDate = new Date(values.date);
        const start = new Date(planStart);
        const end = new Date(planEnd);

        if (activityDate < start || activityDate > end) {
            errors.date = `Aktivnost mora biti zakazana između ${planStart} i ${planEnd}`;
        }
    }
    
    return errors;
};

export const ValidateEditActivityForm = (values, planDates) => {
    let errors = {};

    if (!values.name || values.name.trim() === "") errors.name = "Unesite naziv aktivnosti!";
    if (!values.location || values.location.trim() === "") errors.location = "Unesite lokaciju!";
    if (!values.date) errors.date = "Datum je obavezan!";
    if (!values.time) errors.time = "Vrijeme je obavezno!";
    if (!values.description || values.description.trim() === "") errors.description = "Unesite opis!";

    if (values.budget === undefined || values.budget < 0) {
        errors.budget = "Budžet ne može biti negativan!";
    }

    if (values.date && planDates && planDates.start && planDates.end) {
        const activityDate = new Date(values.date);
        const start = new Date(planDates.start);
        const end = new Date(planDates.end);

        activityDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        if (activityDate < start || activityDate > end) {
            errors.date = `Datum mora biti između ${planDates.start} i ${planDates.end}`;
        }
    }

    return errors;
};