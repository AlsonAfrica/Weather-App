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
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Automatically registers the necessary components
import { FaUserAstronaut } from "react-icons/fa";


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
    hourlyForecast: [],
    dailyForecast: [],
  });

  const [backgroundColor, setBackgroundColor] = useState('#f0f4f8');
  const [backgroundImage, setBackgroundImage] = useState('');
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
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?${search ? `q=${search}` : `lat=${userLocation.latitude}&lon=${userLocation.longitude}`}&units=${unit}&appid=${API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (Array.isArray(data.list)) {
        const hourlyForecast = data.list.slice(0, 8).map((item) => ({
          time: item.dt_txt,
          temperature: unit === 'metric' ? item.main.temp : item.main.temp * 9/5 + 32,
          description: item.weather[0].description,
        }));

        const dailyForecast = data.list.filter((item, index) => index % 8 === 0).map((item) => ({
          date: item.dt_txt.split(' ')[0],
          temperature: unit === 'metric' ? item.main.temp : item.main.temp * 9/5 + 32,
          description: item.weather[0].description,
        }));

        const cachedData = {
          temperature: unit === 'metric' ? data.list[0].main.temp : data.list[0].main.temp * 9/5 + 32,
          humidity: `${data.list[0].main.humidity}%`,
          windSpeed: unit === 'metric' ? data.list[0].wind.speed : data.list[0].wind.speed * 2.237,
          hourlyForecast,
          dailyForecast,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));

        setWeatherData(cachedData);
      } else {
        console.error('Unexpected data format:', data);
        alert('Unexpected data format. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Location not found. Please try again.');

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

  const handleBackgroundImageChange = (e) => {
    setBackgroundImage(e.target.value);
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

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRY_TIME) {
      setWeatherData(cachedData);
    }
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static" color="primary" elevation={4} sx={{ borderRadius: 2, mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: ".9rem" }}>
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
            flexDirection: 'column',
            gap: 3,
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            <WeatherCard
              title="Temperature"
              value={`${weatherData.temperature || 'N/A'}°${unit === 'metric' ? 'C' : 'F'}`}
              icon={<FaTemperatureHigh style={{ fontSize: '2rem' }} />}
              color="#ff5722"
            />
            <WeatherCard
              title="Humidity"
              value={weatherData.humidity || 'N/A'}
              icon={<FaTint style={{ fontSize: '2rem' }} />}
              color="#2196f3"
            />
            <WeatherCard
              title="Wind Speed"
              value={`${weatherData.windSpeed || 'N/A'} ${unit === 'metric' ? 'km/h' : 'mph'}`}
              icon={<FaWind style={{ fontSize: '2rem' }} />}
              color="#4caf50"
            />
          </Box>

          {weatherData.hourlyForecast && weatherData.hourlyForecast.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                mb: 4,
              }}
            >
              {weatherData.hourlyForecast.map((forecast, index) => (
                <Card
                  key={index}
                  sx={{
                    width: '100%',
                    maxWidth: '300px',
                    flex: '1 1 auto',
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{forecast.time}</Typography>
                    <Typography variant="body2">{forecast.temperature}</Typography>
                    <Typography variant="body2">{forecast.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Add the graph here */}
          {weatherData.dailyForecast && weatherData.dailyForecast.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Weekly Temperature Overview
              </Typography>
              <Line
                data={{
                  labels: weatherData.dailyForecast.map((forecast) => forecast.date),
                  datasets: [
                    {
                      label: 'Temperature',
                      data: weatherData.dailyForecast.map((forecast) => forecast.temperature),
                      borderColor: '#ff5722',
                      backgroundColor: 'rgba(255, 87, 34, 0.3)',
                      borderWidth: 2,
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      )}

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
      <DialogTitle>User Profile <FaUserAstronaut /> </DialogTitle>
        <List>
          <ListItem button onClick={handleLocationDialogOpen}>
            <ListItemText primary="Set Location" />
          </ListItem>
          <ListItem button onClick={handleUnitDialogOpen}>
            <ListItemText primary="Change Unit" />
          </ListItem>
          <ListItem button onClick={handleThemeDialogOpen}>
            <ListItemText primary="Change Theme" />
          </ListItem>
        </List>
      </Drawer>

      <Dialog open={locationDialogOpen} onClose={handleLocationDialogClose}>
        <DialogTitle>Set Location</DialogTitle>
        <DialogContent>
          <TextField
            label="City"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button onClick={handleFetchCurrentLocation} color="primary">
            Use Current Location
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLocationDialogClose}>Cancel</Button>
          <Button onClick={handleLocationSet}>Set</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={unitDialogOpen} onClose={handleUnitDialogClose}>
        <DialogTitle>Change Unit</DialogTitle>
        <DialogContent>
          <RadioGroup value={unit} onChange={handleUnitChange}>
            <FormControlLabel value="metric" control={<Radio />} label="Celsius" />
            <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnitDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={themeDialogOpen} onClose={handleThemeDialogClose}>
        <DialogTitle>Change Theme</DialogTitle>
        <DialogContent>
          <SketchPicker color={backgroundColor} onChangeComplete={handleColorChange} />
          <TextField
            label="Background Image URL"
            fullWidth
            value={backgroundImage}
            onChange={handleBackgroundImageChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleThemeDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const WeatherCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: 300, backgroundColor: color, color: 'white', boxShadow: 3 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default HomePage;
