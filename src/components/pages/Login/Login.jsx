import { Link } from 'react-router-dom';
import { LoginForm } from '../../Forms/LoginForm';

export function Login() {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-6">
                    <div className="jumbotron">
                        <h1 className="display-4">Accedi al nostro sito</h1>
                        <LoginForm/>
                        <hr className="my-4" />
                        <p>Non hai un account? <Link to="/register">Registrati qui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}