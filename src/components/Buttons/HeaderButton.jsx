import { Logout } from "./Logout";
import { LoginRegister } from "./LoginRegister";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function HeaderButton() {

    const {user} = useContext(AuthContext);

    return (
        <>
            {user.isLogged ? <Logout /> : <LoginRegister />}
        </>
    );
}