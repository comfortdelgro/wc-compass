import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './default-for-loop.section.html'

export class CdgForLoopDefaultDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const forLoop = this.querySelector('.cdg-for-loop')
    forLoop.items = ['Button 1', 'Button 2'];
    // forLoop.items = [1,2,3,4];

    setTimeout(()=>{
      forLoop.items = [{id: {id: 1}}, {id: {id: 2}}];
      // forLoop.items = [1,2,3,4,5];
    }, 2000)
  }
}
