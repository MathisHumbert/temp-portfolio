import gsap from 'gsap';

import Page from '../../classes/Page';
import { easeOut, expoOut } from '../../utils/easing';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      classes: { active: 'home--active' },
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        time: '.home__nav__time',
        titleSpans: '.home__title span span',
        titleLines: '.home__title__line',
        titleLink: '.home__title__link',
        navText: '.home__nav__bottom__left .home__nav__text',
        navLink: '.home__nav__link',
      },
    });
  }

  /**
   * Animations.
   */
  async show() {
    this.element.classList.add(this.classes.active);

    gsap.fromTo(
      this.elements.titleSpans,
      { yPercent: 125 },
      {
        yPercent: 0,
        ease: expoOut,
        duration: 1.5,
        stagger: 0.1,
      }
    );

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

  addEventListeners() {
    const titleTimeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.2, ease: easeOut },
    });

    titleTimeline.fromTo(
      this.elements.titleLines,
      { opacity: 1 },
      { opacity: 0.4 }
    );

    const navTimeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.2, ease: easeOut },
    });

    navTimeline.fromTo(this.elements.navText, { opacity: 1 }, { opacity: 0.4 });

    this.elements.titleLink.addEventListener('mouseenter', () => {
      titleTimeline.play();
    });

    this.elements.titleLink.addEventListener('mouseleave', () => {
      titleTimeline.reverse();
    });

    this.elements.navLink.addEventListener('mouseenter', () => {
      navTimeline.play();
    });

    this.elements.navLink.addEventListener('mouseleave', () => {
      navTimeline.reverse();
    });
  }
}
