import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [apod, setApod] = useState(null);
    const [roverPhotos, setRoverPhotos] = useState([]);
    const [marsWeather, setMarsWeather] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/apod')
            .then(response => response.json())
            .then(data => setApod(data))
            .catch(error => console.error('Error fetching APOD:', error));

        fetch('http://localhost:5000/mars-photos')
            .then(response => response.json())
            .then(data => setRoverPhotos(data.photos || []))
            .catch(error => console.error('Error fetching Mars photos:', error));

        fetch('http://localhost:5000/mars-weather')
            .then(response => response.json())
            .then(data => setMarsWeather(data))
            .catch(error => console.error('Error fetching Mars weather:', error));
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-4 display-4 fw-bold text-primary">NASA - Imagen del Día</h1>
            {apod ? (
                <div className="card shadow-lg p-4 border-0">
                    <h3 className="card-title text-info mb-3">{apod.title}</h3>
                    <img src={apod.url} alt={apod.title} className="img-fluid rounded mb-3" />
                    <p className="card-text text-muted">{apod.explanation}</p>
                </div>
            ) : (
                <p className="text-secondary">Cargando...</p>
            )}

            <div className="mt-5 p-4 bg-light rounded shadow">
                <h2 className="text-success mb-3">Divulgador Científico: Javier Santaolalla</h2>
                <p>
                    En lo personal, me gustaría hacer mención de mi divulgador científico favorito: <strong>Javier Santaolalla</strong>, a quien conocí hace aproximadamente tres años. Desde entonces, he seguido la mayoría de su contenido, ya que los temas que aborda me parecen sumamente interesantes. Gracias a sus videos, me he planteado diversas preguntas sobre nuestra existencia y nuevas formas de ver el universo. Me ha hecho reflexionar sobre lo pequeños que somos en este vasto espacio y ha sido una fuente de inspiración para indagar más en estos temas.
                </p>
                <p>Javier es un físico español que ha trabajado en el CERN y se dedica a la divulgación científica a través de plataformas digitales.</p>
                <p>Síguelo en sus redes:</p>
                <ul className="list-unstyled">
                    <li><a className="btn btn-danger btn-sm m-1" href="https://www.youtube.com/c/DateUnVlog" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                    <li><a className="btn btn-primary btn-sm m-1" href="https://twitter.com/JaSantaolalla" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a className="btn btn-warning btn-sm m-1" href="https://www.instagram.com/javiersantaolalla" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </div>

            <div className="mt-5">
                <h2 className="text-primary">Fotos recientes de Marte</h2>
                {roverPhotos.length > 0 ? (
                    <div className="row mt-3">
                        {roverPhotos.slice(0, 4).map((photo, index) => (
                            <div className="col-md-3 mb-3" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <img src={photo.img_src} alt="Mars" className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text small">Fecha: {photo.earth_date}</p>
                                        <p className="card-text small">Cámara: {photo.camera.full_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-secondary">Cargando imágenes de Marte...</p>
                )}
            </div>

            <div className="mt-5">
                <h2 className="text-warning">Clima en Marte</h2>
                {marsWeather ? (
                    <div className="card p-4 shadow-sm">
                        <p><strong>Sol:</strong> {marsWeather.sol}</p>
                        <p><strong>Temperatura:</strong> {marsWeather.temperature} °C</p>
                        <p><strong>Presión:</strong> {marsWeather.pressure} Pa</p>
                        <p><strong>Viento:</strong> {marsWeather.wind} m/s</p>
                    </div>
                ) : (
                    <p className="text-secondary">Cargando datos del clima marciano...</p>
                )}
            </div>
        </div>
    );
};

export default App;