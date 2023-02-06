import React from 'react';
import './navbar.css';
import HowToPlayDrop from './HowToPlayDrop'
import AllPlayersDrop from './AllPlayersDrop'
import TimerNav from './TimerNav'
const Navbar = () => {
    return (
        <div className='narbarContainer'>
            <div className='navBarButtons'>
                <AllPlayersDrop />
                <TimerNav />
            </div>
            <div className='logo'>
                <img src='/images/logoCircle.png' alt="codenames" />
            </div>
            <div
                className='navBarButtons'
            >
                <HowToPlayDrop />
            </div>
        </div>
    );
};

export default Navbar;