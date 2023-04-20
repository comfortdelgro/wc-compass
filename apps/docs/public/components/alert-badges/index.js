import './alert-badges.html'

import {CdgAlertBadgesDemo} from './alert-badges'
import {CdgAlertBadgesPropertiesSection} from './properties/properties.section'

customElements.define(
  'cdg-alert-badges-properties-section',
  CdgAlertBadgesPropertiesSection,
)

customElements.define('cdg-alert-badges-demo', CdgAlertBadgesDemo)

export {CdgAlertBadgesPropertiesSection, CdgAlertBadgesDemo}
