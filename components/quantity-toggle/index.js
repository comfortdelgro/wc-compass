import {CdgQuantityToggleEventsSection} from './events/events.section'
import {CdgQuantityTogglePropertiesSection} from './properties/properties.section'
import {CdgQuantityToggleDemo} from './quantity-toggle'

customElements.define('cdg-quantity-toggle-demo', CdgQuantityToggleDemo)
customElements.define(
  'cdg-quantity-toggle-properties-section',
  CdgQuantityTogglePropertiesSection,
)
customElements.define(
  'cdg-quantity-toggle-events-section',
  CdgQuantityToggleEventsSection,
)

export {
  CdgQuantityToggleDemo,
  CdgQuantityTogglePropertiesSection,
  CdgQuantityToggleEventsSection,
}
