# Feedback Fruits' Tic-Tac-Toe Challenge

This repository houses the Ember frontend portion of the Feedback Fruits Tic-Tac-Toe coding challenge. You can find the Rails backend [here](https://github.com/Sensanaty/fbf-xoxo-backend).

## App Description

This is a simple game of Tic-Tac-Toe with the frontend built in EmberJS, featuring a local scoreboard stored via LocalStorage. The backend is built in Rails, and (hopefully) offers multiplayer functionality by utilizing Action Cable and Websockets as well as a global scoreboard via a simple PostgreSQL database.

### Why the weird repo name?

To break it down:

- `fbf` - Feedback Fruits
- `xoxo` - In Serbian, Tic-Tac-Toe is called 'Iks-Oks'
- `frontend` - I think this one is self explanatory

## Installation

* `git clone <repository-url>` this repository
* `cd fbf-xoxo-frontend`
* `yarn install`

## Running / Development

* `ember serve`
* Visit the app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
