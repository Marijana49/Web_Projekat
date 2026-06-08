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