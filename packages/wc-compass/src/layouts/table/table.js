import { removeParam } from './utils';

export class CdgTable extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'table');
  }

  connectedCallback() {
    this.classList.add('cdg-talbe');
    this.addEventListener('sort', (event) => {
      const { sortParam } = event.detail;
      // const subUrl = sortParam !== 'sort=' ? `?${sortParam}` : '';
      // const newUrl1 = `${removeParam('sort', window.location.href)}`;
      // const newUrl2 = `${removeParam('columnId', newUrl1)}`;
      // window.location.href = `${newUrl2}${subUrl}`
      // Make AJAX request or update URL to trigger page navigation with sortParam
    });
  }
}
