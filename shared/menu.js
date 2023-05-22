import {DOCUMENT_CONTENT} from '../constants/document-content'

export function findParentMenu(hash) {
  return DOCUMENT_CONTENT.find((item) => isParentContains(item, hash))
}

export function isParentContains(menu, child) {
  if (menu.childList.length) {
    return menu.childList.some((item) => item.slug === child)
  }
  return false
}
