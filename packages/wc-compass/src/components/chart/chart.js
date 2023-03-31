import {Chart} from 'chart.js'

export class CdgChart extends HTMLElement {
  constructor() {
    super()

    // create shadow DOM
    this.attachShadow({mode: 'open'})
  }

  // this method is called when the component is added to the DOM
  connectedCallback() {
    this.render()
  }

  // this render() method will render the chart
  render() {
    // creates a canvas element with a default size of 420x420 pixels and a container 'div' element for the chart.
    const canvas = document.createElement('canvas')
    const chartSize = document.createElement('div')
    chartSize.classList.add('chart-size')
    chartSize.style.position = 'relative'
    canvas.width = 420
    canvas.height = 420
    // append the canvas to the container 'div' & append the container 'div' to the shadow DOM
    chartSize.appendChild(canvas)
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.appendChild(chartSize)

    // retrieves the chart data, options, and type from the component's attributes using `getAttribute()`
    const data = this.getAttribute('data')
    const options = this.getAttribute('options')
    const type = this.getAttribute('type')

    // create new instance ò the Chart with those above attributes
    this.chart = new Chart(canvas, {
      type,
      data: JSON.parse(data),
      options: JSON.parse(options),
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
