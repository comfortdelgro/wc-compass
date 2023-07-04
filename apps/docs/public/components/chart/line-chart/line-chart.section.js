import {CdgBaseComponent} from '../../../shared/base-component'
import template from './line-chart.section.html'

export class CdgLineChartSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const chart = this.querySelector('cdg-chart')
    const data = [
      {year: 2010, count: 10},
      {year: 2011, count: 20},
      {year: 2012, count: 15},
      {year: 2013, count: 25},
      {year: 2014, count: 22},
      {year: 2015, count: 30},
      {year: 2016, count: 28},
    ]

    chart.options = {
      type: 'line',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map((row) => row.count),
          },
        ],
      },
    }
  }
}
