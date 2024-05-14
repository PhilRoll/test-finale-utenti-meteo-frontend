import { useState } from 'react';
import { fetchWeatherData } from '../../../services/weatherService';
import { ReactWeather } from 'reactjs-weather';
import { WeatherRegister } from '../../../services/RESTservice';

export function Search() {
    //stato del meteo
    const [weatherData, setWeatherData] = useState();
    // barra di ricerca
    const [querySearch, setQuerySearch] = useState('');
    //stato della citta da cercare
    const [city, setCity] = useState();

    //submit del form
    const handleSubmit = async (event) => {
        event.preventDefault();

        let data;
        // imposta i dati meteorologici solo se la query non è vuota
        if (querySearch.trim() !== '') {
            data = await fetchWeatherData(querySearch);
            setWeatherData(data);

            //setta la citta da cercare
            setCity(querySearch);

            const { city, forecast } = weatherData;
            //il json da inviare al db prende solo i dati di oggi
            const data_on_db = {
                city: city.name,
                country: forecast[0].country,
                day: forecast[0].day,
                forecastText: forecast[0].forecastText,
                maxTempCelsius: forecast[0].maxTempCelsius,
                minTempCelsius: forecast[0].minTempCelsius,
                windAverageKmh: forecast[0].windAverageKmh
            }
            //salvataggio sul db:
            WeatherRegister(data_on_db);
        }
        
    };

    // handle input barra di ricerca
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
                        {weatherData && (
                            <div>
                                <ReactWeather city={city} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
