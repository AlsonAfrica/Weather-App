// HomePage layout component//
import React from "react";
import "./HomePage.css";
import cold from "../assets/background-images/winter.jpg";
import sunny from "../assets/background-images/sunny.jpg";
import partlycloudy from "../assets/background-images/partlycloudy.jpg";
import Description from "./Description";

const HomePage = () => {
    return ( 
        <div className="home-wrapper" style={{backgroundImage:`url(${cold})`}}>
            <div className="sidebar"><p>Hello</p></div>
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