import React, { useEffect, useState, useContext } from 'react';
import { fetchWeatherData } from "../../../services/weatherService"
import { ReactWeather } from "reactjs-weather";
import { AuthContext } from '../../contexts/AuthContext';
import { UserInfo } from '../../Sections/UserInfo';
import { WeatherHistory } from '../../Tables/WeatherHistory';

export function UserProfile() {
    // User dal contesto
    const { user } = useContext(AuthContext);
    // Stato del meteo
    const [weatherData, setWeatherData] = useState({});
    // Stato del caricamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchWeatherData(user.city);
                setWeatherData(data);
            } catch (error) {
                console.error("Errore nel recupero dei dati meteorologici:", error);
            } finally {
                setLoading(false);
            }
        }

        if (user.city) {
            fetchData();
        }
    }, [user.city]);

    return (
        <div className="container my-5">
            <UserInfo/>

            <section className="mt-5">
                <h2>Previsioni del tempo della tua città</h2>
                <ReactWeather city={user.city} />
            </section>

            {loading ? (
                <p>Caricamento...</p>
            ) : (
                <>
                    {weatherData && Object.keys(weatherData).length > 0 && (
                        <section className='mt-5'>
                            <WeatherHistory weatherData={weatherData}/>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
