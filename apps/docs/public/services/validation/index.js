import {CdgDatepickerValidationSection} from './datepicker/datepicker-validation.section'
import {CdgDropdownValidationSection} from './dropdown/dropdown-validation.section'
import {CdgFieldValidationSection} from './field-validation/field-validation.section'
import {CdgTouchedSection} from './touched/touched.section'
import {CdgValidationDemo} from './validation'

customElements.define('cdg-validation-demo', CdgValidationDemo)
customElements.define('cdg-field-validation-section', CdgFieldValidationSection)
customElements.define('cdg-touched-section', CdgTouchedSection)
customElements.define(
  'cdg-datepicker-validation-section',
  CdgDatepickerValidationSection,
)
customElements.define(
  'cdg-dropdown-validation-section',
  CdgDropdownValidationSection,
)

export {
  CdgValidationDemo,
  CdgFieldValidationSection,
  CdgTouchedSection,
  CdgDatepickerValidationSection,
  CdgDropdownValidationSection,
}
