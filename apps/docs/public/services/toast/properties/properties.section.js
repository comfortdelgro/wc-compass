import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgToastPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super()
    this.data = [
      {
        name: '<code>show<code>',
        arguments:
          '<code>id: string, toast: CdgToast, option?: ToastConfig</code>',
        description: `<code>id</code> is an unique id to manage all of toast on screen.<br/>
          <code>toast</code> is a <code>cdg-toast</code> element that will display on screen as a toast<br/>
          <code>ToastConfig</code>: <code>{ autoHideAfter: 3000 }</code> auto hide after 3000ms by default`,
      },
      {
        name: '<code>toast<code>',
        arguments: '<code>message: string, icon?: ToastIcon</code>',
        description: `<code>message</code> message that you want to show on the toast.<br/>
          <code>icon: ToastIcon<name: string, color: string></code> if you want to customize toast icon, info icon is the default icon`,
      },
      {
        name: '<code>close<code>',
        arguments: '<code>id: string</code>',
        description: `Call and pass the toast id that you want to close`,
      },
    ]
  }
}
