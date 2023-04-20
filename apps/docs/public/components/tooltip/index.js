import {CdgTooltipPropertiesSection} from './properties/properties.section'
import {CdgTooltipDemo} from './tooltip'

customElements.define('cdg-tooltip-demo', CdgTooltipDemo)

customElements.define(
  'cdg-tooltip-properties-section',
  CdgTooltipPropertiesSection,
)

export {CdgTooltipDemo, CdgTooltipPropertiesSection}
