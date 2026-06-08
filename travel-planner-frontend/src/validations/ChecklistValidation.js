export const ValidateChecklistForm = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = "Unesite naziv!";
    } 

    return errors;
};