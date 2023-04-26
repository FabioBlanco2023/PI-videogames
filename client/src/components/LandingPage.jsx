import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';

export default function LandingPage(){
  return (
      <div className="landing_page">
        <div className='landing_content'>
          <h4 className='title_landing'>BIENVENIDO A LA API DE VIDEOJUEGOS</h4>
           <Link to = '/home'>  
           <button className='button_landing'>PLAY</button>  
          </Link>
        </div>
      </div>
  );
};
