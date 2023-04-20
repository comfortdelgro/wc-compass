import './alert.html'

import {CdgAlertDemo} from './alert'
import {CdgAlertPropertiesSection} from './properties/properties.section'

customElements.define('cdg-alert-properties-section', CdgAlertPropertiesSection)

customElements.define('cdg-alert-demo', CdgAlertDemo)

export {CdgAlertPropertiesSection, CdgAlertDemo}
