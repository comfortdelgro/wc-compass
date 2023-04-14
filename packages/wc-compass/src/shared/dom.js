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
