export function downloadSVGContent(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {cache: 'force-cache'})
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser()
        const result = parser.parseFromString(data, 'text/xml')
        let svgElement = result.getElementsByTagName('svg')[0]
        if (svgElement) {
          resolve(svgElement)
        } else {
          reject(new Error('Loaded file is not valid HTML File"'))
        }
      })
      .catch(() => {
        reject(new Error('Error loading HTML'))
      })
  })
}

export function toLowerCaseAndDash(value) {
  return value.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

export function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement
  } catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.style === 'object' &&
      typeof obj.ownerDocument === 'object'
    )
  }
}

export function getScrollParent(node) {
  if (node == null) {
    return null
  }

  if (node.scrollHeight > node.clientHeight) {
    return node
  } else {
    return getScrollParent(node.parentNode)
  }
}

export function getRealHeight(obj) {
  const clone = obj.cloneNode(true)
  clone.style.display = 'block'
  clone.style.visibility = 'hidden'
  document.querySelector('body').append(clone)
  const height = clone.offsetHeight
  clone.remove()
  return height
}
