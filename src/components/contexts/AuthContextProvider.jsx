import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    city: "",
    weatherForecast: [],
    isLogged: false
  });

  //ricarica i dati in caso di refresh della pagina
  useEffect(() => {

    const token = Cookies.get('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        setUser({
          name: decodedToken.name,
          lastname: decodedToken.lastname,
          email: decodedToken.email,
          city: decodedToken.city,
          weatherForecast: decodedToken.weatherForecast,
          isLogged: true
        });
    }
  }, []);

  const resetContext = () => {
    // Azzeramento dei valori del contesto
    setUser({
      name: "",
      lastname: "",
      email: "",
      city: "",
      weatherForecast: [],
      isLogged: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, resetContext }}>
      {children}
    </AuthContext.Provider>
  );
}
