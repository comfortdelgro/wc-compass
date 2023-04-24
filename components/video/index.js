import {CdgVideoEventsSection} from './events/events.section'
import {CdgVideoPropertiesSection} from './properties/properties.section'
import {CdgVideoDemo} from './video'

customElements.define('cdg-video-demo', CdgVideoDemo)
customElements.define('cdg-video-events-section', CdgVideoEventsSection)
customElements.define('cdg-video-properties-section', CdgVideoPropertiesSection)

export {CdgVideoDemo, CdgVideoEventsSection, CdgVideoPropertiesSection}
