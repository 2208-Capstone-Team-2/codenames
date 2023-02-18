import React from 'react';
import './about.css';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <>
      <div className="aboutPage">
        <Link to={'/'} className="homeButton">
          Home
        </Link>
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
        <div className="aboutTeam">
          <div className="heidi aboutTeamMember">
            <img src="/images/heidi.png" alt="heidi" />
            <div className="contacts">
              <span>Heidi Lyu</span>
              <a href="https://www.linkedin.com/in/heidilyu/" target="_blank">
                Linkedin
              </a>
              <a href="https://github.com/Heidi9287" target="_blank">
                Github
              </a>
              <p className="email">lyu9287@gmail.com</p>
            </div>
            <p className="memberContent">
              My biggest take on this project is learning typescript and firebase. Typescript helps me write codes that
              are more robust and maintainable. We used firebase to make sure this multi-player game can provide a
              seamless experience. In this process, I learned how to model data in a NoSQL environment and how to work
              with unstructured data.
            </p>
          </div>
          <div className="rose aboutTeamMember">
            <img src="/images/rose.jpg" alt="Rose" />

            <div className="contacts">
              <span>Rose</span>
              <a href="https://www.linkedin.com/in/rosalie-newman-rn/" target="_blank">
                Linkedin
              </a>
              <a href="https://github.com/rosalie0?tab=overview&from=2023-02-01&to=2023-02-17" target="_blank">
                Github
              </a>
              <p className="email">rosalienewman0@gmail.com</p>
            </div>
            <p className="memberContent">
              Rose here! So thankful to be part of such a great group & such a fun project. My two biggest takeaways
              were how firebase and SQL can be used together... and how buggy multiplayer games can be! 😂
            </p>
          </div>
          <div className="olivia aboutTeamMember">
            <img src="/images/olivia.png" alt="olivia" />

            <div className="contacts">
              <span>Olivia</span>
              <a href="https://www.linkedin.com/in/olivia-jarman-4908a468/" target="_blank">
                Linkedin
              </a>
              <a href="https://github.com/ocjarman" target="_blank">
                Github
              </a>
              <p className="email">ocjarman@gmail.com</p>
            </div>
            <p className="memberContent">
              As a former teacher and program manager, I know how important it is to collaborate with others on big
              projects. Through building Codenames , I've learned how to work with a team of engineers, reinforce proper
              git hygiene, and to utilize our individual strengths to make an impressive app
            </p>
          </div>
          <div className="josh aboutTeamMember">
            <img src="/images/josh.png" alt="josh" />

            <div className="contacts">
              <span>Josh</span>
              <a href="https://www.linkedin.com/in/joshowens97/" target="_blank">
                Linkedin
              </a>
              <a href="https://github.com/Joshowens16?tab=overview&from=2023-02-01&to=2023-02-17/" target="_blank">
                Github
              </a>
              <p className="email">joshowens16@gmail.com</p>
            </div>
            <p className="memberContent">
              Developing Codenames has been a challenging and very rewarding experience. I have had the opportunity
              throughout this project to learn new technologies like Firebase and TypeScript and continue to build upon
              the my skills in the tech stack I had previous experience with. Collaborating with an awesome team of
              developers has also been an invaluable experience for myself as a developer.
            </p>
          </div>
          <div className="topher aboutTeamMember">
            <img src="/images/topher.jpeg" alt="topher" />
            <div className="contacts">
              <span>Topher</span>
              <a href="/https://www.linkedin.com/in/christopher-ou-53897bb5/" target="_blank">
                Linkedin
              </a>
              <a href="/https://github.com/Bingdongsanchi" target="_blank">
                Github
              </a>
              <p className="email">chrisau418@gmail.com</p>
            </div>
            <p className="memberContent">
              It has been an incredible four months of hard work and dedication that have culminated in the completion
              of our final project. As a team, we have built a game called "Codenames" from scratch, and it has been an
              incredibly rewarding experience. We have faced many challenges along the way, but it has been extremely
              satisfying to overcome them together. Throughout the process, we have encouraged and supported each other,
              and have learned a great deal from each other in the process.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default About;
