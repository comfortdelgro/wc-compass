const SAMPLE_TABS = `
<cdg-tabs classic>
  <cdg-tab activated>Sample</cdg-tab>
  <cdg-tab>Code</cdg-tab>
</cdg-tabs>`

export class SampleSection extends HTMLElement {
  code
  sample
  constructor() {
    super()
    this.classList.add('cdg-sample-section')

    const header = document.createElement('div')
    header.classList.add('sample-header')

    const title = document.createElement('h3')
    title.classList.add('sample-section-title')
    title.innerText = this.getAttribute('name')

    this.sample = this.querySelector('.sample-section')
    this.code = this.querySelector('pre')

    const tabWrapper = document.createElement('div')
    tabWrapper.innerHTML = SAMPLE_TABS
    const tabs = tabWrapper.children[0]

    header.appendChild(title)
    header.appendChild(tabs)

    tabs.addEventListener('switchTab', (data) => {
      if (data.detail === 0) {
        this.sample.classList.add('active')
        this.code.classList.remove('active')
      } else {
        this.sample.classList.remove('active')
        this.code.classList.add('active')
      }
    })

    this.prepend(header)
  }
}
