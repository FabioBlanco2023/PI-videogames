import React from 'react';
import { Link } from "react-router-dom";
import './card.css';


//no necesito traerme ningun estado porqu hago la logica en home.jsx
export default function Card ({name, image, genres, id, rating}) { 
    let genre = genres.map((e) => e.name);

    return (
       
        <div>
            <li className='card card_game'>
            <Link to={'/videogames/' + id}>
            <img className='card_image' src={image} alt='not found' />
            </Link>
            <div className='title_name'><h3>{name}</h3></div>
            <div className="title_genre">Genre: </div>
            <div className='genre'><h5>{genre.join('-')}</h5></div>
            <div className="title_rating">Rating: </div>
            <div className='rating'><h6>{rating}</h6></div>
            
            </li>
        </div>
        
    );
};
