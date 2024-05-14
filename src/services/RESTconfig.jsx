// Funzione per validare il nome
export function validateNome(nome) {
    const regex = /^[a-zA-Z\s']{1,50}$/;
    return regex.test(nome);
}

// Funzione per validare il cognome
export function validateCognome(cognome) {
    const regex = /^[a-zA-Z\s']{1,50}$/;
    return regex.test(cognome);
}

// Funzione per validare l'email
export function validateEmail(email) {
    const regex = /^[A-Za-z0-9\.+_\-]+@[A-Za-z0-9\._-]+\.[A-Za-z]{2,24}$/;
    return regex.test(email);
}

// Funzione per validare la password
export function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return regex.test(password);
}