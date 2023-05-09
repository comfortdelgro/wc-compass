import {CdgSpeedDialEventsSection} from './events/events.section'
import {CdgSpeedDialPropertiesSection} from './properties/properties.section'
import {CdgSpeedDialDemo} from './speed-dial'

customElements.define('cdg-speed-dial-demo', CdgSpeedDialDemo)
customElements.define(
  'cdg-speed-dial-events-section',
  CdgSpeedDialEventsSection,
)
customElements.define(
  'cdg-speed-dial-properties-section',
  CdgSpeedDialPropertiesSection,
)

export {CdgSpeedDialDemo, CdgSpeedDialEventsSection, CdgSpeedDialPropertiesSection}
