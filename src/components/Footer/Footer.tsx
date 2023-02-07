import React from 'react';
import { Facebook, Instagram, Twitter, GitHub } from '@mui/icons-material';
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcStripe, FaCcVisa, FaPaypal } from 'react-icons/fa';
import './footer.css';
function Footer() {
  return (
    <div className="footerContainer">
      <div className="topFooter"></div>
      <div className="bottomFooter">
        <img src="/images/fsa.png" alt="" />
        <div className="icons">
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href="https://github.com/2208-Capstone-Team-2/codenames"
            target="_blank"
          >
            <GitHub fontSize="large" />
          </a>
        </div>
        <p>© 2023 Codenams | Powered by Full Stack Academy Web Dev - Part Time - 2208 - Capstone Group 2</p>
      </div>
    </div>
  );
}
export default Footer;
