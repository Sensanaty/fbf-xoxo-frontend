import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'fbf-xoxo-frontend/config/environment';

export default class ScoreAdapter extends JSONAPIAdapter {
  host = ENV.environment === "production" ? "https://ember-tac-toe.herokuapp.com" : "http://localhost:3000"
}
