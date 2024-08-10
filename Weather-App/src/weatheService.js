const API_KEY = "d7c757ee7b3a22b8f08a5822bcc1a414";


const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Raw data:', data); 

        // Destructuring the data
        const {
            weather,
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            wind: { speed },
            sys: { country },
            name,
        } = data;

        const { description, icon } = weather[0]; // Fixed weather[0] notation

        // Log the destructured data
        console.log('Destructured data:', {
            description,
            icon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            speed,
            country,
            name,
        });

        return {
            description,
            icon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            speed,
            country,
            name,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; 
    }
};

export { getFormattedWeatherData };
