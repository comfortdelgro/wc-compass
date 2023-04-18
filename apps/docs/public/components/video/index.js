import {CdgVideoEventsSection} from './events/events.section'
import {CdgVideoPropertiesSection} from './properties/properties.section'
import './video.html'

customElements.define('cdg-video-events-section', CdgVideoEventsSection)
customElements.define('cdg-video-properties-section', CdgVideoPropertiesSection)

export {CdgVideoEventsSection, CdgVideoPropertiesSection}
