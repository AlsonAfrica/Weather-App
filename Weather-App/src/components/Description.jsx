import React from "react";
import "./Description.css";
import { FaArrowDownLong } from "react-icons/fa6";

const Description = () => {
    return (
        <div className="section section__descriptions">
            <div className="card">
                <div className="description__card-icon">
                    <FaArrowDownLong />
                    <small>min</small>
                </div>
                <h2>32 °C</h2>
            </div>
            <div className="card">
                <div className="description__card-icon">
                    <FaArrowDownLong />
                    <small>min</small>
                </div>
                <h2>32 °C</h2>
            </div>
            <div className="card">
                <div className="description__card-icon">
                    <FaArrowDownLong />
                    <small>min</small>
                </div>
                <h2>32 °C</h2>
            </div>
            <div className="card">
                <div className="description__card-icon">
                    <FaArrowDownLong />
                    <small>min</small>
                </div>
                <h2>32 °C</h2>
            </div>
            <div className="card">
                <div className="description__card-icon">
                    <FaArrowDownLong />
                    <small>min</small>
                </div>
                <h2>32 °C</h2>
            </div>
            <div className="card">
                <div className="description__card-icon">
                    <FaArrowDownLong />
                    <small>min</small>
                </div>
                <h2>32 °C</h2>
            </div>
        </div>
    );
}

export default Description;
