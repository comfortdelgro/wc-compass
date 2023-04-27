import {CONTROL_COMPONENTS} from './components'
import {ICONS_IMAGES} from './components/icon/icon-resource'
import {LAYOUT_COMPONENTS} from './layouts'
import {CdgIconSize} from './shared/core'
import {DialogService} from './shared/dialog'
import {CdgImageViewerService} from './shared/image-viewer-service'
import {CdgLoadingService} from './shared/loading-service'
import {ToastService} from './shared/toast-service'
import './styles/index.scss'

import {
  downloadSVGContent,
  isElement,
  toLowerCaseAndDash,
} from './shared/utilities'

// Init a dialog service
window.cdgDialogService = new DialogService()

window.cdgToastService = new ToastService()

window.cdgLoadingService = new CdgLoadingService()

window.cdgImageViewerService = new CdgImageViewerService()

export {
  CdgIconSize,
  DialogService,
  ToastService,
  CdgLoadingService,
  downloadSVGContent,
  toLowerCaseAndDash,
  isElement,
  ICONS_IMAGES,
  CONTROL_COMPONENTS,
  LAYOUT_COMPONENTS,
}
