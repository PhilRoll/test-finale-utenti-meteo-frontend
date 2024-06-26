import React, { useContext, useEffect, useState } from "react";
import { GetWeatherCronology } from "../../services/RESTservice";
import { AuthContext } from "../contexts/AuthContext";

export function WeatherCronology() {
    const { user } = useContext(AuthContext);
    const [cronology, setCronology] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await GetWeatherCronology(user.id);
                setCronology(data);
            } catch (error) {
                console.error("Errore nel recupero della cronologia:", error);
            } 
        }

        if (user && user.id) {
            fetchData();
        }
    }, [user]);

    let table = null;

    if (cronology.length > 0) {
        table = (
            <div className="table-responsive">
                <h2>Cronologia di ricerche</h2>
                <table className="table table-bordered table-striped">
                    <thead className="table">
                        <tr>
                            <th>Città</th>
                            <th>Data</th>
                            <th>Giorno</th>
                            <th>Descrizione</th>
                            <th>Temperatura Min (°C)</th>
                            <th>Temperatura Max (°C)</th>
                            <th>Vento (km/h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cronology.map((forecastData, index) => (
                            <tr key={index}>
                                <td>{forecastData.name}</td>
                                <td>{forecastData.day.substring(0, 10)}</td>
                                <td>{forecastData.formattedDay}</td>
                                <td>{forecastData.forecastText}</td>
                                <td>{forecastData.minTempCelsius}</td>
                                <td>{forecastData.maxTempCelsius}</td>
                                <td>{forecastData.windAverageKmh}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        table = (
            <div>
                <h2>Cronologia di ricerche</h2>
                <div>Nessun meteo trovato</div>
            </div>
        );
    }

    return table;
}
