import React from 'react';
import './navbar.css';
import HowToPlayDrop from './HowToPlayDrop'
import AllPlayersDrop from './AllPlayersDrop'
import TimerNav from './TimerNav'
import WelcomeBoard from './WelcomeBoard';
const Navbar = () => {
    return (
        <div className='narbarContainer'>
            <div className='navBarButtons'>
                <AllPlayersDrop />
                <TimerNav />
            </div>
            <WelcomeBoard />
            <div
                className='navBarButtons'
            >
                <HowToPlayDrop />
            </div>
        </div>
    );
};

export default Navbar;