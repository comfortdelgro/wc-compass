import { CdgIconSize } from '../../shared/core.js';
import { downloadSVGContent, toLowerCaseAndDash } from '../../shared/utilities';

export class CdgIcon extends CdgIconSize {
  name = '';

  iconSource =
    'https://cdn.jsdelivr.net/gh/comfortdelgro/wc-compass-design@main/dist/images/';

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-icon');
    this.name = this.getAttribute('name');
    if (this.getAttribute('source') === 'host') {
      this.iconSource = './images/';
    }

    if (this.name) {
      this.download(this.iconSource + toLowerCaseAndDash(this.name) + '.svg');
    }
  }

  download(url) {
    downloadSVGContent(url).then((data) => {
      this.appendChild(data);
    });
  }
}
