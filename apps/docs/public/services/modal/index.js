import {CdgModalDefaultSection} from './default-modal/default-modal.section'
import {CdgModalHeaderPropertiesSection} from './header/header.section'
import {CdgModalLargeSection} from './large-modal/large-modal.section'
import {CdgModalDemo} from './modal'
import {CdgModalPropertiesSection} from './properties/properties.section'

customElements.define('cdg-modal-demo', CdgModalDemo)
customElements.define('cdg-modal-properties-section', CdgModalPropertiesSection)
customElements.define('cdg-modal-default-section', CdgModalDefaultSection)
customElements.define('cdg-modal-large-section', CdgModalLargeSection)
customElements.define(
  'cdg-modal-header-properties-section',
  CdgModalHeaderPropertiesSection,
)

export {
  CdgModalDemo,
  CdgModalPropertiesSection,
  CdgModalHeaderPropertiesSection,
  CdgModalDefaultSection,
  CdgModalLargeSection,
}
