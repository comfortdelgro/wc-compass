import {CdgFileDemo} from './file'
import {CdgFilePropertiesSection} from './properties/properties.section'
import {CdgFileStylesSection} from './styles/styles.section'

customElements.define('cdg-file-demo', CdgFileDemo)
customElements.define('cdg-file-properties-section', CdgFilePropertiesSection)
customElements.define('cdg-file-styles-section', CdgFileStylesSection)

export {CdgFileDemo, CdgFilePropertiesSection, CdgFileStylesSection}
