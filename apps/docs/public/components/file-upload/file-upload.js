import {CdgDocumentComponent} from '../../shared/document-component'
import template from './file-upload.html'

export class CdgFileUploadDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const fileList = this.querySelector('#fileList')
    const fileUpload = this.querySelector('#fileUpload')

    fileUpload.addEventListener('selectFiles', (event) => {
      const files = event.detail
      let i = 1
      if (files.length) {
        for (let file of files) {
          fileList.prepend(this.createFile(file, i))
          i++
        }
      }
    })
  }

  createFile(file, index) {
    const fileElement = document.createElement('cdg-file-upload')
    fileElement.setAttribute('state', 'uploading')
    fileElement.setAttribute('fileName', file.name)
    setTimeout(() => {
      fileElement.setAttribute('state', 'success')
      cdgToastService.toast('Uploaded file: "' + file.name + '"')
    }, index * 2000)

    return fileElement
  }
}
