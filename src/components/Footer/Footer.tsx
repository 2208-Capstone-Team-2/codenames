import React from 'react';
import { Facebook, Instagram, Twitter, GitHub } from '@mui/icons-material';
import './footer.css';
function Footer() {
  return (
      <div className="bottomFooter">
        <div className="miscInfo">
          <p>About Us</p>
          <p>Contact Us</p>
          <p>FAQ</p>
          <p>Terms of Service</p>
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
