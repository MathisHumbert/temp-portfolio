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
        images: '.home__infos__image',
        text: '.home__infos__text',
      },
    });

    this.currentProject = 1;
    this.isAnimating = false;

    gsap.set([...this.elements.projects, this.elements.text], {
      autoAlpha: 0,
    });
  }

  show() {
    gsap.set(this.elements.projects[this.currentProject], { autoAlpha: 1 });
    gsap.fromTo(
      this.elements.projects[this.currentProject],
      { clipPath: 'inset(100% 0%)' },
      {
        clipPath: 'inset(0% 0%)',
        duration: 0.8,
        ease: easeOut,
        delay: 0.4,
      }
    );
  }

  /**
   * Events.
   */
  onMouseEnter() {
    const tl = gsap.timeline();

    tl.to(this.elements.images[this.currentProject], {
      scale: 1.25,
      rotate: '-8deg',
      duration: 0.4,
      ease: 'sine.out',
    }).to(
      this.elements.text[this.currentProject],
      { autoAlpha: 1, duration: 0.4, ease: 'sine.out' },
      0
    );
  }

  onMouseLeave() {
    const nextProject = this.currentProject === 0 ? 1 : 0;

    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'sine.out' } });

    tl.to(this.elements.images[this.currentProject], {
      scale: 1,
      rotate: '0',
    })
      .to(
        [
          this.elements.projects[this.currentProject],
          this.elements.text[this.currentProject],
        ],
        { autoAlpha: 0 },
        0
      )
      .to(this.elements.projects[nextProject], { autoAlpha: 1 });

    this.currentProject = nextProject;
  }

  addEventListeners() {
    each(this.elements.projects, (element) => {
      element.addEventListener('mouseenter', () => this.onMouseEnter(), {
        passive: true,
      });

      element.addEventListener('mouseleave', () => this.onMouseLeave(), {
        passive: true,
      });
    });
  }
}
