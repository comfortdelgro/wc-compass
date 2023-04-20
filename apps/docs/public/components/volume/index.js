import {CdgVolumeEventsSection} from './events/events.section'
import {CdgVolumePropertiesSection} from './properties/properties.section'
import {CdgVolumeDemo} from './volume'

customElements.define('cdg-volume-demo', CdgVolumeDemo)
customElements.define('cdg-event-properties-section', CdgVolumeEventsSection)
customElements.define(
  'cdg-volume-properties-section',
  CdgVolumePropertiesSection,
)

export {CdgVolumeDemo, CdgVolumePropertiesSection, CdgVolumeEventsSection}
