import {CdgRangeSliderEventsSection} from './events/events.section'
import {CdgRangeSliderPropertiesSection} from './properties/properties.section'
import {CdgRangeSliderDemo} from './range-slider'

customElements.define('cdg-range-slider-demo', CdgRangeSliderDemo)
customElements.define(
  'cdg-range-slider-properties-section',
  CdgRangeSliderPropertiesSection,
)
customElements.define(
  'cdg-range-slider-events-section',
  CdgRangeSliderEventsSection,
)

export {
  CdgRangeSliderDemo,
  CdgRangeSliderPropertiesSection,
  CdgRangeSliderEventsSection,
}
