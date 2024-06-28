import imagesLoaded from 'imagesloaded';

import Component from '../classes/Component';

export default class Preloader extends Component {
  constructor() {
    super({});

    this.createLoader();
  }

  createLoader() {
    const imgLoaded = imagesLoaded(document.querySelectorAll('img'), {
      background: true,
    });

    imgLoaded.on('done', () => {
      this.emit('loaded');
    });
  }
}
