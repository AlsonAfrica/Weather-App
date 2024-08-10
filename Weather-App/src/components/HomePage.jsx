import React, { useEffect, useState } from "react";
import "./HomePage.css";
import cold from "../assets/background-images/winter.jpg";
import sunny from "../assets/background-images/sunny.jpg";
import partlycloudy from "../assets/background-images/partlycloudy.jpg";
import Description from "./Description";
import { getFormattedWeatherData } from "../weatheService";
import Sidebar from "./Sidebar";

const HomePage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormattedWeatherData('paris');
                setWeatherData(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return ( 
        <div className="home-wrapper" style={{ backgroundImage: `url(${cold})` }}>
            <div className="container-sidebar"><Sidebar/></div>
            <div className="body">
                <div className="search-temp">
                    <div className="container">
                        <div className="section section__inputs">
                            <input type="text" name="city" placeholder="Enter City"/>
                            <button>°F</button>
                        </div>
                        <div className="section section__temperature">
                            <div className="icon">
                                <h3>
                                    Johannesburg,GB
                                    <img src="" alt=""/>
                                    <h3>Cloudy</h3>
                                </h3>
                            </div>
                            <div className="temperature">
                                <h1>34 °C</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description-cards">
                    <Description/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
