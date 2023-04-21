import {CdgBaseComponent} from '../../../shared/base-component'
import template from './default-sidebar.section.html'

export class CdgDefaultSidebarSection extends CdgBaseComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showDefaultSidebarButton = this.querySelector(
      '#showDefaultSidebarButton',
    )
    showDefaultSidebarButton.addEventListener(
      'click',
      this.showSidebar.bind(this),
    )

    this.content =
      this.querySelector('#defaultSidebar').content.firstElementChild.cloneNode(
        true,
      )
    const cancelButton = this.content.querySelector('#cancelButton')
    const okButton = this.content.querySelector('#okButton')

    okButton.addEventListener('click', () => {
      this.content.close()
      cdgToastService.toast("You've approved it!")
    })

    cancelButton.addEventListener('click', () => {
      const confirm = cdgDialogService.confirm({
        dialogTitle: 'Cancel?',
        message: 'Do you still want to abort it?',
        executeLabel: 'OK',
      })

      confirm.addEventListener('close', (event) => {
        cdgToastService.toast(
          event.detail ? 'Yeah, still cancel!' : 'Cancel and back to sidebar.',
        )
        if (event.detail) {
          // Going to close both
          this.content.close()
        }
      })
    })
  }

  showSidebar() {
    const sidebarElement = cdgDialogService.showSidebar(
      'sidebar' + new Date().getTime(),
      this.content,
    )
  }
}
