import { NavLink } from "react-router-dom";

export function LoginRegister() {
    return (
        <div className="ml-auto">
            <NavLink className="btn btn-outline-primary" to="/login">Login</NavLink>
            <span style={{ marginRight: '10px' }} />
            <NavLink className="btn btn-primary" to="/register">Registrati</NavLink>
            <span style={{ marginRight: '10px' }} />
        </div>
    );
}