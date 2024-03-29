import {CdgLongOtpSection} from './long/long-otp.section'
import {CdgOtpDemo} from './otp'
import {CdgOtpPropertiesSection} from './properties/properties.section'
import {CdgShortOtpSection} from './short/short-otp.section'

customElements.define('cdg-otp-demo', CdgOtpDemo)
customElements.define('cdg-otp-properties-section', CdgOtpPropertiesSection)

customElements.define('cdg-short-otp-section', CdgShortOtpSection)
customElements.define('cdg-long-otp-section', CdgLongOtpSection)

export {
  CdgOtpDemo,
  CdgOtpPropertiesSection,
  CdgShortOtpSection,
  CdgLongOtpSection,
}
