// import {Chart} from 'chart.js'

export class CdgChart extends HTMLElement {
  set options(options) {
    this.configOptions = options
  }

  get options() {
    return this.configOptions
  }

  configOptions = {}

  constructor() {
    super()
  }

  // this method is called when the component is added to the DOM
  connectedCallback() {
    this.classList.add('cdg-chart')
    this.render()
  }

  // this render() method will render the chart
  render() {
    // creates a canvas element with a default size of 420x420 pixels and a container 'div' element for the chart.
    const canvas = document.createElement('canvas')
    canvas.classList.add('cdg-chart-canvas')
    this.innerHTML = ''
    this.appendChild(canvas)

    // create new instance of the Chart with those above attributes
    import('chart.js') // .js can be skipped
      .then((module) => {
        module.Chart.register(...module.registerables)
        this.chart = new module.Chart(canvas, this.options)
      })

    // this resize event listener is added to the window object to handle window resizes, and it resizes the chart if it exists
    window.addEventListener('resize', () => {
      if (this.chart) {
        this.chart.resize()
      }
    })
  }

  // user can call this method to update the chart dynamically
  updateChart() {
    if (this.chart) {
      this.chart.update()
    }
  }
}
