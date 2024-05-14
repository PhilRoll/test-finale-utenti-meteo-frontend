export function WeatherHistory({ weatherData }) {
    if (!weatherData) {
        return <div>Nessun meteo trovato</div>;
    }
    
    const { city, forecast } = weatherData;

    return (
        <div className="table-responsive">
            <h2>Previsioni per i prossimi 10 giorni</h2>
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
                    {forecast.map((forecastData, index) => (
                        <tr key={index}>
                            <td>{city.name}</td>
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
}