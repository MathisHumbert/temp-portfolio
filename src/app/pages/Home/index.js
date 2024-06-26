import Page from '../../classes/Page';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      classes: { active: 'home--active' },
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
      },
    });
  }

  /**
   * Animations.
   */
  async show() {
    return super.show();
  }

  async hide() {
    return super.hide();
  }

  /**
   * Loop.
   */
  update() {
    super.update();
  }

  addEventListeners() {}
}
