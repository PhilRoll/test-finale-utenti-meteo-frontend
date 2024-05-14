import React, { useEffect, useState, useContext} from 'react';
import {fetchWeatherData} from "../../../services/weatherService"
import { ReactWeather } from "reactjs-weather";
import { AuthContext } from '../../contexts/AuthContext';
import { UserInfo } from '../../Sections/UserInfo';
import { WeatherHistory } from '../../Tables/WeatherHistory';

export function UserProfile() {
    //user dal contesto
    const { user } = useContext(AuthContext);
    //stato del meteo
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await fetchWeatherData(user.city)
            console.log("dati meteo")
            console.log(weatherData);
            setWeatherData(data);
        }

        fetchData();
    }, []);

    

    return (
        <div className="container my-5">
            <UserInfo/>

            <section className="mt-5">
                <h2>Previsioni del tempo della tua città</h2>
                <ReactWeather city={user.city} />
            </section>
            
            {weatherData.main && 
                <section className='mt-5'>
                    <WeatherHistory weatherData={weatherData}/>
                </section>
            }

        </div>
    );
}
