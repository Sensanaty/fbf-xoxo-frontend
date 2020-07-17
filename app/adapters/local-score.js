import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore} from "@ember/string";
import { pluralize } from 'ember-inflector';

export default class LocalScoreAdapter extends JSONAPIAdapter {
  host= "http://localhost:3000";

  pathForType(type) {
    return underscore(pluralize(type));
  }
}
