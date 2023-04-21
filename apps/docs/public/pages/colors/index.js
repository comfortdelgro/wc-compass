import {CdgColorsDemo} from './colors'
import {CdgPrimaryColorsSection} from './primary-colors/primary-colors.section'
import {CdgSecondaryColorsSection} from './secondary-colors/secondary-colors.section'
import {CdgShadeTintsSection} from './shade-tints/shade-tints.section'

customElements.define('cdg-colors-demo', CdgColorsDemo)
customElements.define('cdg-primary-colors-section', CdgPrimaryColorsSection)
customElements.define('cdg-secondary-colors-section', CdgSecondaryColorsSection)
customElements.define('cdg-shade-tints-section', CdgShadeTintsSection)

export {
  CdgColorsDemo,
  CdgPrimaryColorsSection,
  CdgSecondaryColorsSection,
  CdgShadeTintsSection,
}
