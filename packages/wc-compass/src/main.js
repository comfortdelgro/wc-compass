import './styles/index.scss';
import { ICONS_IMAGES } from './components/icon/icon-resource';
import { CdgIconSize } from './shared/core';
import { CONTROL_COMPONENTS } from './components';
import { LAYOUT_COMPONENTS } from './layouts';
import { DialogService } from './shared/dialog';

import {
  downloadSVGContent,
  toLowerCaseAndDash,
  isElement,
} from './shared/utilities';

// Init a dialog service
window.cdgDialogService = new DialogService();

export {
  CdgIconSize,
  DialogService,
  downloadSVGContent,
  toLowerCaseAndDash,
  isElement,
  ICONS_IMAGES,
  CONTROL_COMPONENTS,
  LAYOUT_COMPONENTS,
};
