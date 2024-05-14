import React, { useState } from 'react';
import { fetchWeatherData } from '../../../services/weatherService';
import { ReactWeather } from 'reactjs-weather';
import { WeatherRegister } from '../../../services/RESTservice';

export function Search() {
    // Stato del meteo
    const [weatherData, setWeatherData] = useState();
    // Stato del caricamento
    const [loading, setLoading] = useState(false);
    // Barra di ricerca
    const [querySearch, setQuerySearch] = useState('');
    // Stato della città da cercare
    const [city, setCity] = useState('');

    // Submit del form
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        setLoading(true);
    
        if (querySearch.trim() !== '') {
            const data = await fetchWeatherData(querySearch);
            if (data && data.city) {
                setWeatherData(data);
                setCity(querySearch);
    
                console.log(weatherData);
                console.log("CITTA" + data.city.name);
                const data_on_db = {
                    name: data.city.name,
                    country: data.city.country,
                    day: data.forecast[0].day,
                    forecastText: data.forecast[0].forecastText,
                    maxTempCelsius: data.forecast[0].maxTempCelsius,
                    minTempCelsius: data.forecast[0].minTempCelsius,
                    windAverageKmh: data.forecast[0].windAverageKmh
                };
    
                WeatherRegister(data_on_db);
            } else {
                console.error("City data not available");
            }
        }
    
        setLoading(false);
    };

    // Handle input barra di ricerca
    const handleInputForm = (event) => {
        setQuerySearch(event.target.value);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-6">
                    <div className="jumbotron">
                        <h1 className="display-4">Cerca la Città</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Milano" value={querySearch} onChange={handleInputForm} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit">
                                        <i className="fa fa-search"></i> Cerca
                                    </button>
                                </div>
                            </div>
                        </form>
                        {loading ? (
                            <p>Caricamento...</p>
                        ) : (
                            weatherData && (
                                <div>
                                    <ReactWeather city={city} />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
