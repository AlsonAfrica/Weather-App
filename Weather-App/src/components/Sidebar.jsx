import React from 'react';
import { Button, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__button">
                <IconButton color="primary">
                    <LocationOnIcon />
                </IconButton>
                <span>Location</span>
            </div>
            <div className="sidebar__button">
                <IconButton color="primary">
                    <PaletteIcon />
                </IconButton>
                <span>Theme</span>
            </div>
            <div className="sidebar__button">
                <IconButton color="primary">
                    <AccountCircleIcon />
                </IconButton>
                <span>Profile</span>
            </div>
            <div className="sidebar__button">
                <IconButton color="primary">
                    <ExitToAppIcon />
                </IconButton>
                <span>Exit</span>
            </div>
        </div>
    );
}

export default Sidebar;
