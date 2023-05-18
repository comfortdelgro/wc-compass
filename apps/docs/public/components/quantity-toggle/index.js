import {CdgQuantityToggleEventsSection} from './events/events.section'
import {CdgQuantityTogglePropertiesSection} from './properties/properties.section'
import {CdgQuantityToggleDemo} from './quantity-toggle'
import {CdgSimpleQuantityToggleSection} from './simple/simple-quantity-toggle.section'

customElements.define('cdg-quantity-toggle-demo', CdgQuantityToggleDemo)
customElements.define(
  'cdg-quantity-toggle-properties-section',
  CdgQuantityTogglePropertiesSection,
)
customElements.define(
  'cdg-quantity-toggle-events-section',
  CdgQuantityToggleEventsSection,
)
customElements.define(
  'cdg-simple-quantity-toggle-section',
  CdgSimpleQuantityToggleSection,
)

export {
  CdgQuantityToggleDemo,
  CdgQuantityTogglePropertiesSection,
  CdgQuantityToggleEventsSection,
  CdgSimpleQuantityToggleSection,
}
