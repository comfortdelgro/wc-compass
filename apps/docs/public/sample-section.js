const SAMPLE_TABS = `
<cdg-tabs classic>
  <cdg-tab activated>
    <cdg-tooltip
      placement="topRight"
      type="secondary"
      hide-close-button
    >
      <div cdg-tooltip-header>
        Sample
      </div>
      <div cdg-tooltip-content class="cdg-tooltip-small-text">
        Show demo
      </div>
    </cdg-tooltip>
  </cdg-tab>
  <cdg-tab>
    <cdg-tooltip
      placement="topRight"
      type="secondary"
      hide-close-button
    >
      <div cdg-tooltip-header>
        Code
      </div>
      <div cdg-tooltip-content class="cdg-tooltip-small-text">
        Show code
      </div>
    </cdg-tooltip>
  </cdg-tab>
</cdg-tabs>`

const COPY_BUTTON_TEMPLATE = `
<cdg-tooltip
  placement="bottomRight"
  type="secondary"
  hide-close-button
  class="sample-section-copy"
>
  <button is="cdg-button" class="primary icon sample-section-copy-button" cdg-tooltip-header>
    <cdg-icon name="copy" size="16"></cdg-icon>
  </button>
  <div cdg-tooltip-content class="cdg-tooltip-small-text">
    Copy source code
  </div>
</cdg-tooltip>
`

function htmlDecode(input) {
  var e = document.createElement('div')
  e.innerHTML = input
  return e.childNodes[0].nodeValue
}

export class SampleSection extends HTMLElement {
  code
  sample
  constructor() {
    super()
    this.setAttribute('pageIndexItem', this.getAttribute('name'))
    this.classList.add('cdg-sample-section')

    const header = document.createElement('div')
    header.classList.add('sample-header')

    const title = document.createElement('h3')
    title.classList.add('sample-section-title')
    title.innerText = this.getAttribute('name')

    const copyButtonTemplate = document.createElement('template')
    copyButtonTemplate.innerHTML = COPY_BUTTON_TEMPLATE
    this.sample = this.querySelector('.sample-section')
    this.code = this.querySelector('pre')
    this.code.append(copyButtonTemplate.content.cloneNode(true))
    const copyButton = this.querySelector('button.sample-section-copy-button')
    const textToCopy = this.code.querySelector('code').innerHTML

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(htmlDecode(textToCopy))
      cdgToastService.toast('Copied!')
    })

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
