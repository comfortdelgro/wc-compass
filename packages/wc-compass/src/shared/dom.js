import {resolveObject} from './utilities'

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
    return resolveObject(obj, getKeysFromString) || ''
  })
}
