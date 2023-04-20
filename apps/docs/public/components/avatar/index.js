import './avatar.html'

import {CdgAvatarDemo} from './avatar'
import {CdgAvatarPropertiesSection} from './properties/properties.section'

customElements.define(
  'cdg-avatar-properties-section',
  CdgAvatarPropertiesSection,
)

customElements.define('cdg-avatar-demo', CdgAvatarDemo)

export {CdgAvatarPropertiesSection, CdgAvatarDemo}
