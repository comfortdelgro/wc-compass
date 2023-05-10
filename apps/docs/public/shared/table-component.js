import {CdgBaseComponent} from './base-component'

export class CdgTableComponentSection extends CdgBaseComponent {
  constructor(title) {
    super()
    this.htmlContent = `<section class="guideline-section" pageIndexItem="${title}">
    <h3 class="sample-section-title">${title}</h3>
    <table id="dataTable" is="cdg-table"></table>
  </section>
    `
  }

  onInit() {
    const table = this.querySelector('#dataTable')
    if (this.tableOptions) {
      table.options = this.tableOptions
    }
    if (this.data) {
      table.data = this.data
    }
  }
}
