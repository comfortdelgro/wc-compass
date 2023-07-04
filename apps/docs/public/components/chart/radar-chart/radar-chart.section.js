import {CdgBaseComponent} from '../../../shared/base-component'
import template from './radar-chart.section.html'

export class CdgRadarChartSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const data = {
      labels: [
        ['Eating', 'Dinner'],
        ['Drinking', 'Water'],
        'Sleeping',
        ['Designing', 'Graphics'],
        'Coding',
        'Cycling',
        'Running',
      ],
      datasets: [
        {
          data: [25, 40, 63, 70, 30, 54, 80]
        },
      ],
    }

    const config = {
      type: 'radar',
      data: data,
      options: {
        plugins: {
          legend: false,
          tooltip: false,
        },
        elements: {
          line: {
            backgroundColor: 'rgba(1, 66, 175,0.2)',
            borderColor: 'rgba(1, 66, 175,0.6)',
          },
          point: {
            backgroundColor: 'rgba(1, 66, 175,0.4)',
            hoverBackgroundColor: 'rgba(1, 66, 175,0.2)',
            radius: '5',
            pointStyle: 'circle',
            hoverRadius: 1,
          },
        },
      },
    }

    const chart = this.querySelector('cdg-chart')
    chart.options = config
  }
}
