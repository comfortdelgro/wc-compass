import '@ungap/custom-elements'
import {CONTROL_COMPONENTS} from './components'
import {ICONS_IMAGES} from './components/icon/icon-resource'
import {LAYOUT_COMPONENTS} from './layouts'
import {CdgContextMenuService} from './shared/context-menu-service'
import {CdgIconSize} from './shared/core'
import {DialogService} from './shared/dialog'
import {CdgLoop} from './shared/for-loop'
import {CdgImageViewerService} from './shared/image-viewer-service'
import {CdgLoadingService} from './shared/loading-service'
import {ToastService} from './shared/toast-service'

import './styles/index.scss'

import {ListViewService} from './shared/list-view.service'
import {
  downloadHTMLContent,
  downloadSVGContent,
  isElement,
  toLowerCaseAndDash,
} from './shared/utilities'

// Init a dialog service
window.cdgDialogService = new DialogService()

window.cdgToastService = new ToastService()

window.cdgLoadingService = new CdgLoadingService()

window.cdgImageViewerService = new CdgImageViewerService()

window.cdgListViewService = new ListViewService()

export {
  CdgIconSize,
  DialogService,
  ToastService,
  CdgLoadingService,
  CdgContextMenuService,
  CdgLoop,
  downloadSVGContent,
  downloadHTMLContent,
  toLowerCaseAndDash,
  isElement,
  ICONS_IMAGES,
  CONTROL_COMPONENTS,
  LAYOUT_COMPONENTS,
}
