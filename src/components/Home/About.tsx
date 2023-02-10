import React from 'react';
import './about.css';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <>
      <Link to={'/'} className="homeButton">
        Home
      </Link>
      <div className="aboutPage">
        <div className="aboutIntro">
          <h2>About Us</h2>
          <p>
            We are proud to introduce Codenames - the final project for our fullstack web development cohort that
            showcases our hard work, creativity, and dedication to computer science.
            <br></br>
            You can more find details about us and the project below
          </p>{' '}
        </div>
        <div className="break"></div>
        <div className="aboutTeam">
          <div className="aboutTeamMember">
            <img src="/images/heidi.jpg" alt="heidi" />
            <span>Heidi Lyu</span>
            <div className="contacts">
              <a href="https://www.linkedin.com/in/heidilyu/" target="_blank">
                Linkedin
              </a>
              <a href="https://github.com/Heidi9287" target="_blank">
                Github
              </a>
              <p>lyu9287@gmail.com</p>
            </div>
            <p className="memberContent">
              My biggest take on this project is learning typescript and firebase. Typescript helps me write codes that
              are more robust and maintainable. We used firebase to make sure this multi-player game can provide a
              seamless experience. In this process, I learned how to model data in a NoSQL environment and how to work
              with unstructured data.
            </p>
          </div>
          <div className="aboutTeamMember">
            <img src="/images/rose.jpg" alt="Rose" />
            <span>Rose</span>
            <div className="contacts">
              <a href="/" target="_blank">
                Linkedin
              </a>
              <a href="/" target="_blank">
                Github
              </a>
              <p>email@gmail.com</p>
            </div>
            <p className="memberContent">
              Rose here! So thankful to be part of such a great group & such a fun project. My two biggest takeaways
              were how firebase and SQL can be used together... and how buggy multiplayer games can be! 😂
            </p>
          </div>
          <div className="aboutTeamMember">
            <img src="/images/heidi.jpg" alt="heidi" />
            <span>Member 3</span>
            <p className="memberContent">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <div className="break"></div>
          <div className="aboutTeamMember">
            <img src="/images/heidi.jpg" alt="heidi" />
            <span>Member 4</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <div className="aboutTeamMember">
            <img src="/images/heidi.jpg" alt="heidi" />
            <span>Member 5</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
