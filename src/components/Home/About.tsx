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
          <h2>About The Game</h2>
          <p>
            We are proud to introduce Codenames - the final project for our fullstack web development cohort that
            showcases our hard work, creativity, and dedication to computer science.
          </p>
          Language and Frameworks:
          <div className="flex-container">
            <img src="https://img.shields.io/badge/Typescript-027bcd?&logo=typescript&logoColor=white" />
            <img src="https://img.shields.io/badge/Firebase-red?&logo=firebase" />
            <img src="https://img.shields.io/badge/ts–node-242526?&logo=tsnode" />
            <img src="https://img.shields.io/badge/Express-yellowgreen?&logo=express" />
            <img src="https://img.shields.io/badge/Sequelize-2e3b69?&logo=sequelize" />
            <img src="https://img.shields.io/badge/Redux-764abc?&logo=redux" />
            <img src="https://img.shields.io/badge/Webpack-darkgreen?&logo=webpack" />
            <img src="https://img.shields.io/badge/Babel-red?&logo=babel" />
            <img src="https://img.shields.io/badge/ESLint-764abc?&logo=eslint" />
          </div>
          <p>
            More technical details about this project can be found on
            <a href="https://github.com/2208-Capstone-Team-2/codenames"> Github</a>
          </p>
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
            <img src="/images/olivia.png" alt="olivia" />
            <span>Olivia</span>
            <div className="contacts">
              <a href="https://www.linkedin.com/in/olivia-jarman-4908a468/" target="_blank">
                Linkedin
              </a>
              <a href="https://github.com/ocjarman" target="_blank">
                Github
              </a>
              <p>ocjarman@gmail.com</p>
            </div>
            <p className="memberContent">
              As a former teacher and program manager, I know how important it is to collaborate with others on big
              projects. Through building Codenames , I've learned how to work with a team of engineers, reinforce proper
              git hygiene, and to utilize our individual strengths to make an impressive app
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
