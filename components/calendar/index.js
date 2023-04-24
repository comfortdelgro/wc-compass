import {CdgCalendarDemo} from './calendar'
import {CdgCalendarPropertiesSection} from './properties/properties.section'

customElements.define('cdg-calendar-demo', CdgCalendarDemo)

customElements.define(
  'cdg-calendar-properties-section',
  CdgCalendarPropertiesSection,
)

export {CdgCalendarDemo, CdgCalendarPropertiesSection}
