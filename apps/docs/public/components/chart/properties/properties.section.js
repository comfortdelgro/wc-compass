import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgChartPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods</h3>
  
    <cdg-table id="propertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.data = [
      {
        name: 'data',
        type: '<code>string</code>',
        default: '',
        description: `String object type including <code>datasets</code>, <code>labels</code>
        <br>
        <strong>Sample</strong>
        <br>
        <code>{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"My First Dataset","data":[65,59,80,81,56,55,40],"fill":false,"borderColor":"rgb(75, 192, 192)","lineTension":0.1}]}</code>
        `,
      },
      {
        name: 'options',
        type: '<code>string</code>',
        default: '',
        description: `The configuration is used to change how the chart behaves.
        <br>
        <strong>Reference</strong>
        <br>
        <a href="https://www.chartjs.org/docs/latest/configuration/" target="_blank">Configuration</a>
        `,
      },
      {
        name: 'type',
        type: '<code>string</code>',
        default: '',
        description: `Set of built-in chart types
        <br>
        <strong>Reference</strong>
        <br>
        <a href="/docs/latest/charts/area.html" class="">Built-in chart types</a>`,
      },
    ]
  }
}
