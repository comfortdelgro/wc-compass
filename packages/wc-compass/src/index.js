import './styles/index.scss';
import { ICONS_IMAGES } from './components/icon/icon-resource';
import { CdgIconSize } from './shared/core';
import { CONTROL_COMPONENTS } from './components';
import { LAYOUT_COMPONENTS } from './layouts';
import { DialogService } from './shared/dialog';
import { ToastService } from './shared/toast-service';

import {
  downloadSVGContent,
  toLowerCaseAndDash,
  isElement,
} from './shared/utilities';

// Init a dialog service
window.cdgDialogService = new DialogService();

window.cdgToastService = new ToastService();

export {
  CdgIconSize,
  DialogService,
  ToastService,
  downloadSVGContent,
  toLowerCaseAndDash,
  isElement,
  ICONS_IMAGES,
  CONTROL_COMPONENTS,
  LAYOUT_COMPONENTS,
};
