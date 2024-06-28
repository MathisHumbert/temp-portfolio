import gsap from 'gsap';
import Prefix from 'prefix';

import Component from '../../classes/Component';
import { easeInOut } from '../../utils/math';
import { each, getOffset } from '../../utils/dom';
import { lerp } from '../../utils/math';
import { easeOut } from '../../utils/easing';

export default class Project extends Component {
  constructor() {
    super({
      element: '.home__infos__right',
      elements: {
        projects: '.home__infos__right__project',
        infinite: '.home__infos__right__infinite',
        infiniteWrapper: '.home__infos__right__infinite__wrapper',
        infiniteTexts: '.home__infos__right__infinite__text',
      },
    });

    this.currentProject = Math.floor(Math.random() * 2);
    this.isAnimating = false;
    this.transformPrefix = Prefix('transform');
    this.scroll = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    gsap.set([this.elements.projects, this.elements.infinite], {
      autoAlpha: 0,
    });

    this.animateInfinite = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: easeOut },
    });

    this.animateInfinite.fromTo(
      this.elements.infinite,
      { autoAlpha: 0 },
      { autoAlpha: 1 }
    );
  }

  show() {
    gsap.to(this.elements.projects[this.currentProject], {
      autoAlpha: 1,
      duration: 1,
      ease: easeInOut,
      delay: 0.6,
    });
  }

  /**
   * Events.
   */
  onResize() {
    this.infiniteWidth = this.elements.infiniteWrapper.clientWidth;

    const { left } = getOffset(this.elements.infiniteWrapper);

    each(this.elements.infiniteTexts, (item) => {
      item.style[this.transformPrefix] = `translate3d(0, 0, 0)`;

      const offset = getOffset(item);
      item.offset = { ...offset, left: offset.left - left };
      item.extra = 0;
    });
  }

  onMouseEnter() {
    if (this.isAnimating) return;

    this.animateInfinite.play();
  }

  onMouseLeave(element) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentProject = this.currentProject === 0 ? 1 : 0;

    this.animateInfinite.reverse();

    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: easeOut },
      onComplete: () => (this.isAnimating = false),
    });

    tl.to(element, { autoAlpha: 0 }).to(
      this.elements.projects[this.currentProject],
      {
        autoAlpha: 1,
      }
    );
  }

  /**
   * Loop.
   */
  update(time) {
    this.scroll.target += 6 * time;

    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    each(this.elements.infiniteTexts, (item) => {
      const position = -this.scroll.current - item.extra;
      const offset = position + item.offset.left + item.offset.width;

      item.isBefore = offset < -this.infiniteWidth * 0.1;

      if (item.isBefore) {
        item.extra -= this.infiniteWidth;

        item.isBefore = false;
      }

      item.style[this.transformPrefix] = `translate3d(${Math.round(
        position
      )}px, 0, 0)`;
    });
  }

  addEventListeners() {
    each(this.elements.projects, (element) => {
      element.addEventListener('mouseenter', () => this.onMouseEnter(), {
        passive: true,
      });

      element.addEventListener('mouseleave', () => this.onMouseLeave(element), {
        passive: true,
      });
    });
  }
}
