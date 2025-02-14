require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend requests
app.use(cors());

// API Route
app.get('/weather', async (req, res) => {
    try {
        const { location } = req.query; // Get location from frontend request
        const apiKey = process.env.WEATHER_API_KEY; // Load API key from .env
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
