import {CdgDashboardSideCardDemo} from './dashboard-side-card'
import {CdgDashboardSideCardPropertiesSection} from './properties/properties.section'
import {CdgDashboardSideCardStylesSection} from './styles/styles.section'

customElements.define('cdg-dashboard-side-card-demo', CdgDashboardSideCardDemo)
customElements.define(
  'cdg-dashboard-side-card-styles-section',
  CdgDashboardSideCardStylesSection,
)
customElements.define(
  'cdg-dashboard-side-card-properties-section',
  CdgDashboardSideCardPropertiesSection,
)

export {
  CdgDashboardSideCardDemo,
  CdgDashboardSideCardPropertiesSection,
  CdgDashboardSideCardStylesSection,
}
