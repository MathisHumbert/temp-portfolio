import gsap from 'gsap';
import SplitType from 'split-type';

import Page from '../../classes/Page';
import { Detection } from '../../classes/Detection';
import Project from './Project';
import { expoOut } from '../../utils/easing';
import { each, map } from '../../utils/dom';

export default class Home extends Page {
  constructor() {
    const monthsInEnglish = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const currentDate = new Date();
    const nextMonthDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    const nextMonthIndex = nextMonthDate.getMonth();

    const datesEl = document.querySelectorAll(
      '.home__infos__availability__date'
    );

    each(
      datesEl,
      (element) =>
        (element.textContent = `${
          monthsInEnglish[nextMonthIndex]
        } ${nextMonthDate.getFullYear()}`)
    );

    super({
      id: 'home',
      classes: { active: 'home--active' },
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        title: '.home__title span span span',
        projects: '.home__infos__right__project',
        links: '.home__infos__link a',
        dates: '.home__infos__availability__date',
        linksChars: null,
      },
    });
  }

  create() {
    super.create();

    if (!Detection.isMobile) {
      this.projects = map(
        [...this.elements.projects].reverse(),
        (element, index) => new Project(element, index)
      );
    }

    this.elements.linksChars = map(
      this.elements.links,
      (element) =>
        new SplitType(element, {
          types: 'chars',
          tagName: 'span',
          charClass: '',
        }).chars
    );
  }

  /**
   * Animations.
   */
  async show() {
    this.element.classList.add(this.classes.active);

    const tl = gsap.timeline();

    tl.fromTo(
      this.elements.title,
      { yPercent: 175, rotate: '5deg' },
      { yPercent: 0, rotate: 0, ease: expoOut, duration: 1.5, stagger: 0.1 }
    );

    each(this.projects, (project) => {
      if (project && project.show) {
        project.show();
      }
    });

    return super.show();
  }

  async hide() {
    this.element.classList.remove(this.classes.active);

    return super.hide();
  }

  /**
   * Events.
   */

  addEventListeners() {
    each(this.elements.links, (element, index) => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: expoOut, duration: 0.2 },
      });

      tl.fromTo(
        this.elements.linksChars[index],
        { color: '#cef571' },
        { color: '#e3c6fa', stagger: { each: 0.05, from: 'random' } }
      );

      element.addEventListener('mouseenter', () => tl.play(), {
        passive: true,
      });

      element.addEventListener('mouseleave', () => tl.reverse(), {
        passive: true,
      });
    });
  }
}
