import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'fbf-xoxo-frontend/config/environment';

console.log(ENV.environment);

export default class ScoreAdapter extends JSONAPIAdapter {
  host = ENV.environment === "production" ? "https://murmuring-savannah-67805.herokuapp.com/" : "http://localhost:3000"
}
