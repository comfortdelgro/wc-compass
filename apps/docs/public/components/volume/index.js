import {CdgVolumeEventsSection} from './events/events.section'
import {CdgVolumePropertiesSection} from './properties/properties.section'
import './volume.html'

customElements.define('cdg-event-properties-section', CdgVolumeEventsSection)
customElements.define(
  'cdg-volume-properties-section',
  CdgVolumePropertiesSection,
)

export {CdgVolumePropertiesSection, CdgVolumeEventsSection}
