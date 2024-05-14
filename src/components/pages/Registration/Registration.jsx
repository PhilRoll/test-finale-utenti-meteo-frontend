import { Link } from 'react-router-dom';
import { RegistrationForm } from '../../Forms/RegistrationForm';

export function Registration() {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-6">
                    <div className="jumbotron">
                        <h1 className="display-4">Crea un nuovo account</h1>
                        <RegistrationForm/>
                        <hr className="my-4" />
                        <p>Hai già un account? <Link to="/login">Accedi qui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}