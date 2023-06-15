import {CdgRegEmailSection} from './reg-email/reg-email.section'
import {CdgRegNumberSection} from './reg-number/reg-number.section'
import {CdgRegPhoneSection} from './reg-phone/reg-phone.section'
import {CdgRegSpaceSection} from './reg-space/reg-space.section'
import {CdgRegTextSection} from './reg-text/reg-text.section'
import {CdgUtilitiesDemo} from './utilities'
import {CdgUtilitySection} from './utility/utility.section'

customElements.define('cdg-utilities-demo', CdgUtilitiesDemo)
customElements.define('cdg-utility-section', CdgUtilitySection)
customElements.define('cdg-reg-space-section', CdgRegSpaceSection)
customElements.define('cdg-reg-text-section', CdgRegTextSection)
customElements.define('cdg-reg-email-section', CdgRegEmailSection)
customElements.define('cdg-reg-phone-section', CdgRegPhoneSection)
customElements.define('cdg-reg-number-section', CdgRegNumberSection)

export {
  CdgUtilitiesDemo,
  CdgUtilitySection,
  CdgRegSpaceSection,
  CdgRegTextSection,
  CdgRegEmailSection,
  CdgRegPhoneSection,
  CdgRegNumberSection,
}
