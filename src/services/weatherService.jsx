export async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://weather.algobook.info/forecast/${city}`);
        const data = await response.json();
        console.log("fetch",data);
        return data;
    } catch (error) {
        console.error('Errore nel recupero dei dati meteorologici:', error);
        throw error; 
    }
}