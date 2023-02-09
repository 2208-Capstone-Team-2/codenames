import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="aboutPage">
        <div className='aboutIntro'>
      <h1>About Us</h1>
      <p>
      We are proud to introduce Codenames - the final project for our fullstack web development cohort 
      that showcases our hard work, creativity, and dedication to computer science. 
   
      We would like to express our heartfelt thank you to our instructor Ben and mentor Luis at FullStack Academy. 
      Their guidance, support, and expertise were instrumental in the success of our project.

      You can find details about the team and the project below
      </p> </div>
      <div className="break"></div>
      <div className='aboutTeam'>
        <div className='aboutTeamMember'>
        <img src='/images/heidi.jpg' alt='heidi'/>
        <span>Heidi Lyu</span>
        <p>My name is Heidi and I come from an art background.
        You can find my full resume <a href="https://www.linkedin.com/in/heidilyu/">here</a>.
        <br></br>
        My biggest take on this project is learning typescript and firebase. Typescript helps me write codes that are more robust and maintainable.
       We used firebase to make sure this multi-player game can provide a seamless experience.
    In this process, I learned how to model data in a NoSQL environment and how to work with unstructured data.</p>
        </div>
        <div className='aboutTeamMember'>
        <img src='/images/heidi.jpg' alt='heidi'/>
        <span>Member 2</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className='aboutTeamMember'>
        <img src='/images/heidi.jpg' alt='heidi'/>
        <span>Member 3</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div><div className="break"></div>
        <div className='aboutTeamMember'>
        <img src='/images/heidi.jpg' alt='heidi'/>
        <span>Member 4</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className='aboutTeamMember'>
        <img src='/images/heidi.jpg' alt='heidi'/>
        <span>Member 5</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  );
};
export default About;