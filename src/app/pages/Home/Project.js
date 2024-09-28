import gsap from 'gsap';

import Component from '../../classes/Component';
import { easeOut } from '../../utils/easing';

export default class Project extends Component {
  constructor(element, index) {
    super({
      element: element,
      elements: {
        image: '.home__infos__image',
        text: '.home__infos__text',
      },
    });

    this.index = index;

    gsap.set(this.elements.text, {
      autoAlpha: 0,
    });
  }

  show() {
    gsap.set(this.element, { autoAlpha: 1 });

    gsap.fromTo(
      this.element,
      { clipPath: 'inset(100% 0%)' },
      {
        clipPath: 'inset(0% 0%)',
        duration: 0.8,
        ease: easeOut,
        delay: 0.4 + 0.1 * this.index,
      }
    );
  }

  /**
   * Events.
   */
  onMouseEnter() {
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'sine.out' } });

    tl.to(this.elements.image, {
      scale: 1.25,
      rotate: '-8deg',
      duration: 0.4,
      ease: 'sine.out',
    }).to(
      this.elements.text,
      { autoAlpha: 1, duration: 0.4, ease: 'sine.out' },
      0
    );
  }

  onMouseLeave() {
    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: 'sine.out' },
    });

    tl.to(this.elements.image, {
      scale: 1,
      rotate: '0',
      duration: 0.4,
      ease: 'sine.out',
    }).to(
      this.elements.text,
      { autoAlpha: 0, duration: 0.4, ease: 'sine.out' },
      0
    );
  }

  addEventListeners() {
    this.element.addEventListener('mouseenter', () => this.onMouseEnter(), {
      passive: true,
    });

    this.element.addEventListener('mouseleave', () => this.onMouseLeave(), {
      passive: true,
    });
  }
}
