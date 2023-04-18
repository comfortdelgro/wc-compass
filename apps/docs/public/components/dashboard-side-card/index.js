import {CdgDashboardSideCardPropertiesSection} from './properties/properties.section'
import {CdgDashboardSideCardStylesSection} from './styles/styles.section'

customElements.define(
  'cdg-dashboard-side-card-styles-section',
  CdgDashboardSideCardStylesSection,
)
customElements.define(
  'cdg-dashboard-side-card-properties-section',
  CdgDashboardSideCardPropertiesSection,
)

export {
  CdgDashboardSideCardPropertiesSection,
  CdgDashboardSideCardStylesSection,
}
