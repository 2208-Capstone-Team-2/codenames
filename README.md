# Codenames

<img src='public/images/transparentLogo.png' alt='logo' height='auto' width='auto'/>

<div class="flex-container"><!-- .element: style="display: flex; flex-direction: row;" -->
  <img src="https://img.shields.io/badge/Typescript-027bcd?&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-red?&logo=firebase"/>
  <img src="https://img.shields.io/badge/ts–node-242526?&logo=tsnode"/>
  <img src="https://img.shields.io/badge/Express-yellowgreen?&logo=express"/>
  <img src="https://img.shields.io/badge/Sequelize-2e3b69?&logo=sequelize"/>
  <img src="https://img.shields.io/badge/Redux-764abc?&logo=redux"/>
  <img src="https://img.shields.io/badge/Webpack-darkgreen?&logo=webpack"/>
  <img src="https://img.shields.io/badge/Babel-red?&logo=babel"/>
  <img src="https://img.shields.io/badge/ESLint-764abc?&logo=eslint"/>
</div>

## Play popular card game Codenames with your friends online today!

Fast-paced and easy to learn, simply click the 'create room' button, and invite your friends by sending them the URL in your web browser. Everyone should now enter their usernames, assign themselves teams and roles. The host can now setup the game board- and you're ready to play CODENAMES!

### Getting Started

There are two ways to run our project.

#### Play online

Visit our [website](https://codenames-0nt7.onrender.com) and play!

#### Play locally

1. Clone this repo onto your computer
2. If you don't have it already, install [Postgresql](https://www.postgresql.org/)
3. Open terminal, change directory into the cloned repo's root folder, and and enter each line individually:

```bash
createdb codenames
npm install
npm run seed:dev
npm run start:dev
```

4. Navigate to <http://localhost:3000/> and create a room!
5. For additional players, you will need to have a unique browser visit this port. This can be achieved by creating an incognito tab!

### Diagrams and Images from planning

Our backend models & schema:

![A diagram showing all the models, and their associations](excalidraws/schemaRedrawn.svg)
A diagram of how players are created and updated, depending on if they created the room or entered it via a link:
![Flow of how players are created and updated, depending on if they created the room or entered it via a link.](excalidraws/roomFlow.svg)

### Known Issues

- Player must assign themselves a role before the board setup in order to see the board
- Website layout is not mobile friendly

### Contributing

Thank you for being interested in contributing to our project. Currently we are not looking for contributions from users outside of our organization.

### Acknowledgements

- Words for the cards sourced from <https://github.com/sagelga/codenames>
- [Adobe Express](https://express.adobe.com/express-apps/logo-maker/) for logo creation
- Fullstack Academy & and our amazing instructor [Ben](https://github.com/Semiroundpizza8) and awesome mentor [Louis](https://github.com/lrabeno)
