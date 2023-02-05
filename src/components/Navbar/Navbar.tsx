import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import HowToPlayDrop from './HowToPlayDrop'
import AllPlayersDrop from './AllPlayersDrop'
const Navbar = () => {
    return (
        <div className='narbarContainer'>
            <div className='logo'>
                <img src='/images/logoCircle.png' alt="codenames" />
            </div>
            <div
                className='navBarButtons'
            >
                <HowToPlayDrop />
                <AllPlayersDrop />
            </div>
        </div>
    );
};

export default Navbar;