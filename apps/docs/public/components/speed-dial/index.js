import {CdgSpeedDialBottomSection} from './bottom/speed-dial-bottom.section'
import {CdgSpeedDialEventsSection} from './events/events.section'
import {CdgSpeedDialLeftSection} from './left/speed-dial-left.section'
import {CdgSpeedDialPropertiesSection} from './properties/properties.section'
import {CdgSpeedDialRightSection} from './right/speed-dial-right.section'
import {CdgSpeedDialDemo} from './speed-dial'
import {CdgSpeedDialUpSection} from './up/speed-dial-up.section'

customElements.define('cdg-speed-dial-demo', CdgSpeedDialDemo)
customElements.define(
  'cdg-speed-dial-events-section',
  CdgSpeedDialEventsSection,
)
customElements.define(
  'cdg-speed-dial-properties-section',
  CdgSpeedDialPropertiesSection,
)
customElements.define('cdg-speed-dial-right-section', CdgSpeedDialRightSection)
customElements.define('cdg-speed-dial-left-section', CdgSpeedDialLeftSection)
customElements.define(
  'cdg-speed-dial-bottom-section',
  CdgSpeedDialBottomSection,
)
customElements.define('cdg-speed-dial-up-section', CdgSpeedDialUpSection)

export {
  CdgSpeedDialDemo,
  CdgSpeedDialEventsSection,
  CdgSpeedDialPropertiesSection,
  CdgSpeedDialRightSection,
  CdgSpeedDialLeftSection,
  CdgSpeedDialBottomSection,
  CdgSpeedDialUpSection,
}
