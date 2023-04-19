import './modal.html'

import {CdgModalHeaderPropertiesSection} from './header/header.section'
import {CdgModalPropertiesSection} from './properties/properties.section'

customElements.define('cdg-modal-properties-section', CdgModalPropertiesSection)
customElements.define(
  'cdg-modal-header-properties-section',
  CdgModalHeaderPropertiesSection,
)

export {CdgModalPropertiesSection}
