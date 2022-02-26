import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';


export default function LandingPage(){
    return (
        <div className='landing_page'>
            <div>
                <h1 className='title_landing'>What are you looking for, Human?</h1>
                <h4 className='subtitle_landing'>In this SPA, you can search for breeds of dogs or create one</h4>

                <Link to = '/home'>
                    <button className='button_landing'>🐾</button>
                </Link>
            </div>

        </div>
    )
}
