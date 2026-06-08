export const ValidateCreateExpenseForm = (values, planDates) => {
    let errors = {};
    const { planStart, planEnd } = planDates;

    if (!values.name) {
        errors.name = "Unesite naziv troška!";
    }

    if(values.amount <= 0){
        errors.amount = "Unesite validnu vrijednost!";
    }

    if (!values.category == -1) {
        errors.category = "Molimo odaberite kategoriju troška!";
    }

    if (!values.date) {
       errors.date = "Unesite datum!";
    }
    
    if (!values.description) {
        errors.description = "Unesite opis troška!";
    }

    if(values.date && planStart && planEnd){
        const activityDate = new Date(values.date);
        const start = new Date(planStart);
        const end = new Date(planEnd);

        if (activityDate < start || activityDate > end) {
            errors.date = `Datum troška mora biti između ${planStart} i ${planEnd}`;
        }
    }
    
    return errors;
};