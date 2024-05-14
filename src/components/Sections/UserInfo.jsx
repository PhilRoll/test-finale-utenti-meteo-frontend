import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function UserInfo() {

    const { user, resetContext } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    const handleDeleteUser = () => {
        //DeleteUser(email);
        resetContext();
        setShowAlert(false); 
        navigate('/');
    };

    return (
        <section className="mt-5">
            <h2>Profilo di {user.name} {user.lastname}</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Informazioni personali</h5>
                    <p className="card-text"><strong>Nome:</strong> {user.name}</p>
                    <p className="card-text"><strong>Cognome:</strong> {user.lastname}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Città:</strong> {user.city}</p>
                    <button onClick={() => setShowAlert(true)} className="btn btn-danger mt-3">Elimina Profilo</button>
                </div>
            </div>
            {showAlert && (
                <div className="alert alert-danger mt-3" role="alert">
                    Sei sicuro di voler eliminare il tuo profilo?
                    <button onClick={handleDeleteUser} className="btn btn-danger btn-sm ml-2">Elimina</button>
                    <button onClick={() => setShowAlert(false)} className="btn btn-secondary btn-sm ml-2">Annulla</button>
                </div>
            )}
        </section>
    );
}
