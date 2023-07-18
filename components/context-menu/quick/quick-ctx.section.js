import {CdgContextMenuService} from '@comfortdelgro/wc-compass/src/shared/context-menu-service'
import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './quick-ctx.section.html'

export class CdgQuickCtxSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const area = this.querySelector('.mycontext')
    const contextMenu = new CdgContextMenuService(area, [
      {label: 'Item 1'},
      {
        label: 'Item 2',
        children: [
          {
            label: 'Child 1',
          },
          {
            label: 'Child 2',
            children: [
              {label: 'Grand Child 1'},
              {label: 'Grand child 2'},
              {label: 'Grand child 3'},
            ],
          },
          {label: 'Child 3'},
        ],
      },
      {
        label: 'Item 3',
        children: [
          {
            label: 'Child 1',
            children: [
              {label: 'Grand Child 1'},
              {label: 'Grand child 2'},
              {label: 'Grand child 3'},
              {label: 'Grand child 4'},
              {label: 'Grand child 5'},
            ],
          },
          {label: 'Child 2'},
          {label: 'Child 3'},
        ],
      },
      {label: 'Item 4'},
    ])
    contextMenu.onSelect = (menu) => {
      cdgToastService.toast('User has selected: ' + menu.label)
    }
  }
}
