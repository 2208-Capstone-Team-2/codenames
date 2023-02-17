import React from 'react';
import { Facebook, Instagram, Twitter, GitHub } from '@mui/icons-material';
import './footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="lastRow">
      <div className="miscInfo">
        <Link to={'./about'}>
          <p>About Us</p>
        </Link>
        <p>Contact Us</p>
        <Link to={'./faq'}>
          <p>FAQ</p>
        </Link>
        <Link to={'./terms'}>
          {' '}
          <p>Terms of Service</p>{' '}
        </Link>
      </div>
      <div className="groupInfo">
        <p>© 2023 Codenames | Powered by Full Stack Academy Web Dev - Part Time - 2208 - Capstone Group 2</p>
      </div>
      <div className="icons">
        <a
          style={{ textDecoration: 'none', color: 'white' }}
          href="https://github.com/2208-Capstone-Team-2/codenames"
          target="_blank"
        >
          <GitHub fontSize="large" />
        </a>
      </div>
    </div>
  );
}
export default Footer;
