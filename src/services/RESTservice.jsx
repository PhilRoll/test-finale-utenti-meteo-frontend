//fetch di registrazione utente
export async function UserRegister(body) {

    const jsonBody = JSON.stringify(body);

    const response = await fetch("http://localhost:8080/api/user/registration", {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token_value"
        },
        body: jsonBody,
    });

    return response;
}



//fetch di login
export async function UserLogin(body) {

    const jsonBody = JSON.stringify(body);

    const response = await fetch("http://localhost:8080/api/user/login", {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token_value"
        },
        body: jsonBody,
    });

    return response;
}



// fetch info singolo utente (utile per visualizzare la lista dei corsi di un utente)
export async function GetUserInfoByEmail(email) {
   const response = await fetch(`http://localhost:8080/api/user/userinfo/${email}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token_value"
        }
    });

    const data = await response.json();
    return data;
}



// salva le info del meteo
export async function WeatherRegister(body) {

    const jsonBody = JSON.stringify(body);

    const response = await fetch("http://localhost:8080/api/weather/save", {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token_value"
        },
        body: jsonBody,
    });

    return response;
}