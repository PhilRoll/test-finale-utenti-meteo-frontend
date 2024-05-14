import { useState,useEffect } from "react";
import { UserRegister } from "../../services/RESTservice";
import { Link, Navigate } from "react-router-dom";
import { validateNome, validateCognome, validateEmail, validatePassword } from "../../services/RESTconfig";

export function RegistrationForm() {
    //inizializzazione dello stato del form
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        city:"",
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
        
        //FETCH
        let response = await UserRegister(formData);

        // Validazione dei campi del form
        if (!validateNome(formData.name) || !validateCognome(formData.lastname) || !validateEmail(formData.email) || !validatePassword(formData.password)) {
            setErrorFlag(true);
        }

        if(response.ok){
            setSuccessFlag(true);

            //reset dello stato del form
            setFormData({
                name: "",
                lastname: "",
                email: "",
                city:"",
                password: ""
            });
        }

        else{
            console.error(response);
            setErrorFlag(true)
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Cognome</label>
                <input type="text" className="form-control" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="city" className="form-label">Città</label>
                <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                <div className="form-text">(Minimo 8 caratteri, almeno un numero, un carattere speciale e un carattere maiuscolo)</div>
            </div>
            
            <button type="submit" className="btn btn-primary">Registrati</button>
        </form>
        
        {errorFlag && <p className="alert alert-danger">Campi errati.. Riprova</p>}

        {successFlag && (
            <p className="alert alert-success d-flex justify-content-between align-items-center">
                <span>Registrazione avvenuta con successo!</span>
                <Link className="btn btn-primary btn-sm" to="/login">Accedi</Link>
            </p>
        )}
        </>
    );
}