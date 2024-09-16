import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FaTemperatureHigh, FaTint, FaWind } from 'react-icons/fa';
import axios from 'axios';
import { SketchPicker } from 'react-color';

const CACHE_KEY = 'weatherData';
const CACHE_EXPIRY_TIME = 3600000; // 1 hour in milliseconds

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
  });

  const [backgroundColor, setBackgroundColor] = useState('#f0f4f8');
  const [unit, setUnit] = useState('metric');

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [unitDialogOpen, setUnitDialogOpen] = useState(false);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);

  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (!search && !userLocation) return;

    setLoading(true);
    const API_KEY = 'd7c757ee7b3a22b8f08a5822bcc1a414';
    const locationToUse = search || (userLocation && `${userLocation.latitude},${userLocation.longitude}`) || '';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${search ? `q=${search}` : `lat=${userLocation.latitude}&lon=${userLocation.longitude}`}&units=${unit}&appid=${API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Save data to localStorage with timestamp
      const cachedData = {
        temperature: unit === 'metric' ? `${data.main.temp}°C` : `${data.main.temp}°F`,
        humidity: `${data.main.humidity}%`,
        windSpeed: unit === 'metric' ? `${data.wind.speed} km/h` : `${data.wind.speed} mph`,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));

      setWeatherData(cachedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Location not found. Please try again.');

      // Load cached data if available
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRY_TIME) {
        setWeatherData(cachedData);
      }
    }
    setLoading(false);
  };

  const handleLocationDialogOpen = () => setLocationDialogOpen(true);
  const handleLocationDialogClose = () => setLocationDialogOpen(false);

  const handleUnitDialogOpen = () => setUnitDialogOpen(true);
  const handleUnitDialogClose = () => setUnitDialogOpen(false);

  const handleThemeDialogOpen = () => setThemeDialogOpen(true);
  const handleThemeDialogClose = () => setThemeDialogOpen(false);

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleLocationSet = () => {
    if (location) {
      setUserLocation(null);
      setSearch(location);
      handleSearch();
      handleLocationDialogClose();
    }
  };

  const handleFetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setSearch('');
          handleSearch();
          handleLocationDialogClose();
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Could not get your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Load cached data on component mount if offline
  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRY_TIME) {
      setWeatherData(cachedData);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2, backgroundColor: backgroundColor, minHeight: '100vh' }}>
      <AppBar position="static" color="primary" elevation={4} sx={{ borderRadius: 2, mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Weather App
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search city..."
            value={search}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              mr: 2,
              width: { xs: '150px', md: '250px' },
            }}
          />
          <Button variant="contained" color="secondary" onClick={handleSearch} sx={{ fontWeight: 'bold' }}>
            Search
          </Button>
        </Toolbar>
      </AppBar>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            mt: 4,
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          <WeatherCard
            title="Temperature"
            value={weatherData.temperature || 'N/A'}
            icon={<FaTemperatureHigh style={{ color: '#ff5722' }} />}
          />
          <WeatherCard
            title="Humidity"
            value={weatherData.humidity || 'N/A'}
            icon={<FaTint style={{ color: '#2196f3' }} />}
          />
          <WeatherCard
            title="Wind Speed"
            value={weatherData.windSpeed || 'N/A'}
            icon={<FaWind style={{ color: '#4caf50' }} />}
          />
        </Box>
      )}

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250, p: 2 }}>
          <ListItem>
            <Typography variant="h6" color="primary">
              User Settings
            </Typography>
          </ListItem>
          <ListItem button onClick={handleLocationDialogOpen}>
            <ListItemText primary="Location Settings" />
          </ListItem>
          <ListItem button onClick={handleUnitDialogOpen}>
            <ListItemText primary="Unit Settings (°C / °F)" />
          </ListItem>
          <ListItem button onClick={handleThemeDialogOpen}>
            <ListItemText primary="Theme" />
          </ListItem>
        </List>
      </Drawer>

      <Dialog open={locationDialogOpen} onClose={handleLocationDialogClose}>
        <DialogTitle>Location Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Set your preferred location or use your current location.</Typography>
          <TextField
            variant="outlined"
            label="Enter Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleLocationSet} sx={{ mr: 1 }}>
            Set Location
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleFetchCurrentLocation}>
            Use Current Location
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLocationDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={unitDialogOpen} onClose={handleUnitDialogClose}>
        <DialogTitle>Unit Settings</DialogTitle>
        <DialogContent>
          <RadioGroup value={unit} onChange={handleUnitChange}>
            <FormControlLabel value="metric" control={<Radio />} label="Celsius (°C)" />
            <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit (°F)" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnitDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={themeDialogOpen} onClose={handleThemeDialogClose}>
        <DialogTitle>Theme Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Select a background color for your weather app.</Typography>
          <SketchPicker color={backgroundColor} onChangeComplete={handleColorChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleThemeDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const WeatherCard = ({ title, value, icon }) => (
  <Card sx={{ width: 200, p: 2, display: 'flex', alignItems: 'center', boxShadow: 3 }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="h6" color="textPrimary">{title}</Typography>
        <Typography variant="body1" color="textSecondary">{value}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default HomePage;
