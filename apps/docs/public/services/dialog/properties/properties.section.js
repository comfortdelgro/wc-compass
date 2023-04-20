import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgDialogPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        'Function Name': '<code>alert</code>',
        type: '<code>function</code>',
        description: `Call open alert dialog.
        <br>
        <strong>Params Object</strong>
        <br>
        <code>dialogTitle</code>: Title in the top
        <br>
        <code>message</code>: Text in content
        <br>
        <code>buttonLabel</code>: Text of button
        `,
      },
      {
        'Function Name': '<code>showStatus</code>',
        type: '<code>function</code>',
        description: `Call open Success/Error dialog.
        <br>
        <strong>Params Object</strong>
        <br>
        <code>status</code>: Type of dialog (<code>success</code> | <code>error</code>)
        <br>
        <code>title</code>: Title of dialog
        <br>
        <code>message</code>: Text in content
        <br>
        <code>executeLabel</code>: Text of bottom button
        `,
      },
      {
        'Function Name': '<code>warning</code>',
        type: '<code>function</code>',
        description: `Call open warning dialog.
        <br>
        <strong>Params Object</strong>
        <br>
        <code>dialogTitle</code>: Title in the top
        <br>
        <code>message</code>: Text in content
        <br>
        <code>executeLabel</code>: Text of right button
        `,
      },
      {
        'Function Name': '<code>confirm</code>',
        type: '<code>function</code>',
        description: `Call open confirm dialog.
        <br>
        <strong>Params Object</strong>
        <br>
        <code>dialogTitle</code>: Title in the top
        <br>
        <code>message</code>: Text in content
        <br>
        <code>executeLabel</code>: Text of right button
        `,
      },
      {
        'Function Name': '<code>confirmCustom</code>',
        type: '<code>function</code>',
        description: `Call open confirm dialog with custom content.
        <br>
        <strong>Params Object</strong>
        <br>
        <code>content</code>: HTML element
        <br>
        <code>executeLabel</code>: Text of right button
        `,
      },
    ]
  }

}
