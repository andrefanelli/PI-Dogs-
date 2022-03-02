import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default function Card({image, name, temperament, weight, id}) {
    return (
        <div>
            <Link to={'/dog/' + id}>
            <img className='card_image' src={image} alt='img not found'/>
            </Link>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h5>{weight}</h5>
            
        </div>
    );

}