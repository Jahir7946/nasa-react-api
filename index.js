const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

const NASA_API_KEY = process.env.NASA_API_KEY;

// Ruta para Imagen del Día (APOD)
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la imagen del día' });
    }
});

// Obtener el último sol con imágenes disponibles
const getLatestSolWithPhotos = async () => {
    try {
        const manifestResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${NASA_API_KEY}`);
        const manifest = manifestResponse.data.photo_manifest;
        const latestSol = manifest.photos[manifest.photos.length - 1].sol;
        return latestSol;
    } catch (error) {
        console.error('Error al obtener el manifiesto:', error);
        return null;
    }
};

// Ruta para Fotos de Marte
app.get('/mars-photos', async (req, res) => {
    try {
        const latestSol = await getLatestSolWithPhotos();
        if (!latestSol) return res.status(500).json({ error: 'No se pudo obtener el sol más reciente' });

        const photosResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${latestSol}&api_key=${NASA_API_KEY}`);
        res.json(photosResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las fotos de Marte' });
    }
});

// Ruta para datos simulados del clima marciano
app.get('/mars-weather', (req, res) => {
    res.json({
        sol: 1234,
        temperature: -63,
        pressure: 715,
        wind: 5.3
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});