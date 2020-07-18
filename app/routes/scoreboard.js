import Route from '@ember/routing/route';

export default class ScoreboardRoute extends Route {
  async model() {
    return {
      score: this.store.findAll('score')
    }
  }
}
