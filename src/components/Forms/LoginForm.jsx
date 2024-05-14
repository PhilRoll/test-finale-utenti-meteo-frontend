import { useState, useContext } from "react";
import { UserLogin } from "../../services/RESTservice";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Importa il modulo js-cookie
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export function LoginForm() {
    //inizializzazione dello stato del form

    const {user, setUser} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // stati flag di verifica
    const [errorFlag, setErrorFlag] = useState(false);
    const [successFlag, setSuccessFlag] = useState(false);

    
    // handle dati sul form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.table(formData);

        let response = await UserLogin(formData);

        if (response.ok) {
            setSuccessFlag(true);
            //reset dello stato del form
            setFormData({
                email: "",
                password: ""
            });

            //lettura del token
            const data = await response.json();

            console.log(data);

            const JWTtoken = data.token;
            //salvataggio del token sui cookies
            Cookies.set('token', JWTtoken,{expires: new Date(data.ttl)}); 

            //decodificare il token jwtDecode, 
            let decodedToken = jwtDecode(JWTtoken);
            console.log(decodedToken);

            setUser({
                id: decodedToken.id,
                name: decodedToken.name,
                lastname: decodedToken.lastname,
                email: decodedToken.email,
                city: decodedToken.city,
                weatherForecast: decodedToken.weatherForecast,
                isLogged: true
              });
        } 

        else {
            console.log(response.status)
            setErrorFlag(true);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {errorFlag && <p className="alert alert-danger">Credenziali errate</p>}
            {successFlag && <Navigate to="/user/profile" />}
        </>
    );
}