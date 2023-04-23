import {CdgFileUploadDemo} from './file-upload'
import {CdgFileUploadPropertiesSection} from './properties/properties.section'

customElements.define('cdg-file-upload-demo', CdgFileUploadDemo)
customElements.define(
  'cdg-file-upload-properties-section',
  CdgFileUploadPropertiesSection,
)

export {CdgFileUploadDemo, CdgFileUploadPropertiesSection}
