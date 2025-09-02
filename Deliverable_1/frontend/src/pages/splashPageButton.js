//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { Link } from 'react-router-dom';

function splashPageButton({ text, to, outline }) { 
    return (
        <Link to={to} className={`splash-button ${outline ? 'outline' : ''}`}>
            {text}
        </Link>
    );
}
export default splashPageButton;                                                                               