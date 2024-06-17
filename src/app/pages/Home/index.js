import Page from '../../classes/Page';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      classes: { active: 'home--active' },
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        time: document.querySelector('.nav__time'),
      },
    });
  }

  /**
   * Animations.
   */
  async show() {
    this.element.classList.add(this.classes.active);

    return super.show();
  }

  async hide() {
    this.element.classList.remove(this.classes.active);

    return super.hide();
  }

  calcTime(offset) {
    const d = new Date();

    const utc = d.getTime() + d.getTimezoneOffset() * 60000;

    const nd = new Date(utc + 3600000 * offset);

    let hours = nd.getHours();
    let minutes = nd.getMinutes();

    if (minutes === this.minutes) return;

    this.minutes = minutes;

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (this.elements.time) {
      this.elements.time.textContent = `${hours}:${minutes} ${
        hours > 12 ? 'pm' : 'am'
      }`;
    }
  }

  /**
   * Loop.
   */
  update() {
    super.update();

    this.calcTime(2);
  }
}
