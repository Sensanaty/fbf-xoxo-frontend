import Model, { attr } from '@ember-data/model';

export default class ScoreModel extends Model {
  @attr username;
  @attr wins;
  @attr draws;
  @attr losses;
}
