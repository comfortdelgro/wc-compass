import {CdgBarChartSection} from './bar-chart/bar-chart.section'
import {CdgChartDemo} from './chart'
import {CdgLineChartSection} from './line-chart/line-chart.section'
import {CdgChartPropertiesSection} from './properties/properties.section'
import {CdgRadarChartSection} from './radar-chart/radar-chart.section'

customElements.define('cdg-chart-demo', CdgChartDemo)
customElements.define('cdg-bar-chart-section', CdgBarChartSection)
customElements.define('cdg-line-chart-section', CdgLineChartSection)
customElements.define('cdg-radar-chart-section', CdgRadarChartSection)

export {
  CdgChartDemo,
  CdgChartPropertiesSection,
  CdgBarChartSection,
  CdgLineChartSection,
  CdgRadarChartSection,
}
