
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
const Navbar = () => {
    return (
        <div className='narbarContainer'>
            <div className='logo'>
            <img src='/images/logoCircle.png' alt="codenames" />
            </div>
            <Link to={'/leaderboard'}>
            <button>
                Leaderboard
            </button>
            </Link>
        </div>
    );
};

export default Navbar;