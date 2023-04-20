import {CdgBaseComponent} from './base-component'

export class CdgTableComponentSection extends CdgBaseComponent {
  constructor(title) {
    super()
    this.htmlContent = `<section class="guideline-section" pageIndexItem="${title}">
    <h3 class="sample-section-title">${title}</h3>
    <cdg-table id="dataTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#dataTable')
    table.data = this.data
  }
}
