import React from 'react';
import './card.css';

export default function Card({image, name, temperament, weight}) {
    return (
        <div>
            <img className='card_image' src={image} alt='img not found'/>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h5>{weight}</h5>
        </div>
    );

}