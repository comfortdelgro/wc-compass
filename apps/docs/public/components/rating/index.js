import {CdgRatingEventsSection} from './events/events.section'
import {CdgRatingPropertiesSection} from './properties/properties.section'
import {CdgRatingDemo} from './rating'

customElements.define('cdg-rating-demo', CdgRatingDemo)
customElements.define(
  'cdg-rating-events-section',
  CdgRatingEventsSection,
)
customElements.define(
  'cdg-rating-properties-section',
  CdgRatingPropertiesSection,
)

export {CdgRatingDemo, CdgRatingEventsSection, CdgRatingPropertiesSection}
