import {resolveObject} from './utilities'

export function getClosestParentElement(current, tagName) {
  if (current && current.parentElement) {
    if (current.parentElement.tagName.toLowerCase() === tagName) {
      return current.parentElement
    } else {
      return getClosestParentElement(current.parentElement, tagName)
    }
  }
  return current
}

export function getClosestElement(current, selector) {
  if (current.parentElement) {
    if (current.parentElement.querySelector(selector)) {
      return current
    } else {
      return getClosestElement(current.parentElement, selector)
    }
  }
  return current
}

export function replacePlaceholders(str, obj) {
  return str.replace(/{{([^{}]*)}}/g, (match, key) => {
    const getKeysFromString = key.split('.').slice(1).join('.')
    if (!getKeysFromString) {
      return obj || ''
    }
    const result = resolveObject(obj, getKeysFromString)
    return result || (result === 0 ? 0 : '')
  })
}

export function swapChild(element, targetElement) {
  if (!element.children) {
    return
  }
  targetElement.textContent = ''
  Array.from(element.children).forEach((element) => {
    targetElement.appendChild(element)
  })
}
