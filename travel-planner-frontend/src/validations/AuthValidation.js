export const ValidateLoginForm = (values) => {
    let errors = {};

    if (!values.email) {
        errors.email = "Email je obavezan!";
    } 

    if (!values.password) {
        errors.password = "Lozinka je obavezna!";
    } else if (values.password.length < 6) {
        errors.password = "Lozinka mora imati barem 6 karaktera!";
    }

    return errors;
};

export const ValidateRegisterForm = (values) => {
    let errors = {};

    if(!values.name){
        errors.name = "Unesite ime!";
    }

    if (!values.email) {
        errors.email = "Email je obavezan.";
    }
    
    if (!values.password) {
        errors.password = "Lozinka je obavezna.";
    } else if (values.password.length < 6) {
        errors.password = "Lozinka mora imati barem 6 karaktera.";
    }

     return errors;
}