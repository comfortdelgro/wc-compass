import {CdgDialogAlertSection} from './alert/alert.section'
import {CdgDialogConfirmSection} from './confirm/confirm.section'
import {CdgDialogCustomConfirmSection} from './custom-confirm/custom-confirm.section'
import {CdgDialogDemo} from './dialog'
import {CdgDialogPropertiesSection} from './properties/properties.section'
import {CdgDialogRatingSection} from './rating/rating.section'
import {CdgDialogStatusSection} from './status/status.section'
import {CdgDialogWarningSection} from './warning/warning.section'

customElements.define('cdg-dialog-demo', CdgDialogDemo)

customElements.define('cdg-dialog-alert-section', CdgDialogAlertSection)

customElements.define('cdg-dialog-status-section', CdgDialogStatusSection)

customElements.define('cdg-dialog-warning-section', CdgDialogWarningSection)

customElements.define('cdg-dialog-rating-section', CdgDialogRatingSection)

customElements.define('cdg-dialog-confirm-section', CdgDialogConfirmSection)

customElements.define(
  'cdg-dialog-custom-confirm-section',
  CdgDialogCustomConfirmSection,
)

customElements.define(
  'cdg-dialog-properties-section',
  CdgDialogPropertiesSection,
)

export {
  CdgDialogDemo,
  CdgDialogAlertSection,
  CdgDialogStatusSection,
  CdgDialogPropertiesSection,
  CdgDialogWarningSection,
  CdgDialogConfirmSection,
  CdgDialogCustomConfirmSection,
  CdgDialogRatingSection,
}
