export class ListViewService {
  _dataTransfer = null

  get dataTransfer() {
    return this._dataTransfer
  }

  set dataTransfer(value) {
    this._dataTransfer = value
  }

  setNewDataTransfer(value) {
    this.dataTransfer = {
      ...value,
      newListView: this.dataTransfer ? this.dataTransfer.newListView : null,
    }

    if (this.dataTransfer.newListView) {
      this.dataTransfer.newListView.dispatchEvent(
        new CustomEvent('onListItemPositionChange'),
      )
    }
  }

  resetData() {
    this.dataTransfer = null
  }

  notifyGotDataTransfer(newListView) {
    this.dataTransfer = {...this.dataTransfer, newListView}
  }

  notifyOriginDragEnd(detail) {
    const elementIndex = Array.prototype.indexOf.call(
      this.dataTransfer.newListView.children,
      this.dataTransfer.placeholder,
    )

    this.dataTransfer.newListView.dispatchEvent(
      new CustomEvent('onOriginListViewDragEnd', {detail}),
    )

    this.dataTransfer.origin.dispatchEvent(
      new CustomEvent('onRemoveItem', {
        detail: {
          dragElement: this.dataTransfer.target,
          elementIndex: this.dataTransfer.removeIndex,
        },
      }),
    )
    this.dataTransfer.newListView.dispatchEvent(
      new CustomEvent('onAddItem', {
        detail: {
          dragElement: this.dataTransfer.target,
          elementIndex,
        },
      }),
    )
  }
}
