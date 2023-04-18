import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDialogPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Methods for <code>cdgDialogService</code></h3>
  
    <cdg-table id="propertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.data = [
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
