import {CdgDatepickerDemo} from './datepicker'
import {CdgDatePickerPropertiesSection} from './properties/properties.section'

customElements.define('cdg-datepicker-demo', CdgDatepickerDemo)

customElements.define(
  'cdg-datepicker-properties-section',
  CdgDatePickerPropertiesSection,
)

export {CdgDatepickerDemo, CdgDatePickerPropertiesSection}
