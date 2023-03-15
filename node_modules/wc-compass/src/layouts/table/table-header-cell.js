import { findParam } from './utils';

let headerCellCount = 0;
export class CdgTableHeaderCell extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'th');
    this.headerCellId = ++headerCellCount;
  }
  connectedCallback() {
    this.classList.add('cdg-talbe-header-cell');
    const contents = document.createElement('div')
    contents.classList.add('cdg-talbe-header-cell-contents')
    this.appendChild(contents)
    // add label to header cell
    const label = this.getAttribute('label');
    contents.innerHTML = label
    // add event onclick
    this.addEventListener('click', () => {
      const sortDir = this.getNextSortDir();
      const url = new URL(window.location.href);
      // Destructure variables for clarity
      const { headerCellId } = this;
      const { searchParams } = url;
      const sortParam = searchParams.get('sort');
      const sortDirParam = searchParams.get('columnId');

      // Create sorting icons using template literals
      const ascSortIcon = `<cdg-sorting-asc></cdg-sorting-asc>`;
      const descSortIcon = `<cdg-sorting-desc></cdg-sorting-desc>`;

      // Remove sorting icons if they exist
      document
        .querySelectorAll('.cdg-sorting-asc, .cdg-sorting-desc')
        .forEach((icon) => icon.remove());

      if (sortDir === '') {
        searchParams.delete('sort');
        searchParams.delete('columnId');
      } else {
        searchParams.set('sort', sortDir);
        searchParams.set('columnId', headerCellId);

        // Add appropriate sorting icon based on sort direction
        contents.insertAdjacentHTML(
          'beforeend',
          sortDir === 'asc' ? ascSortIcon : descSortIcon
        );
      }
      window.history.pushState({}, '', url);
      this.dispatchEvent(
        new CustomEvent('sortChanged', {
          detail: { sortDir, columnId: this.headerCellId },
        })
      );
    });
  }

  getNextSortDir() {
    const url = new URL(window.location.href);
    const currentDir = url.searchParams.get('sort');
    const currentSortColumnId = url.searchParams.get('columnId');
    if (Number(currentSortColumnId) !== this.headerCellId) {
      return 'asc';
    } else if (currentDir === 'asc') {
      return 'desc';
    } else if (currentDir === 'desc') {
      return '';
    } else {
      return 'asc';
    }
  }
}
