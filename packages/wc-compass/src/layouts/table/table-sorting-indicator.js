export class CdgSortingAsc extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.classList.add('cdg-sorting-asc');
    // Create a new SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '26');
    svg.setAttribute('viewBox', '0 0 24 26');

    const path1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    path1.setAttribute(
      'd',
      'M12.8476 4.34166C12.379 3.88611 11.6181 3.88611 11.1495 4.34166L6.35152 9.00651C6.00666 9.34179 5.90546 9.84108 6.09288 10.2784C6.2803 10.7157 6.71512 11 7.20242 11H16.7984C17.282 11 17.7205 10.7157 17.908 10.2784C18.0954 9.84108 17.9904 9.34179 17.6493 9.00651L12.8513 4.34166H12.8476Z'
    );
    path1.setAttribute('fill', ['#A19F9D', '#EDEBE9'][0]);

    const path2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    path2.setAttribute(
      'd',
      'M11.1524 21.3277C11.621 21.7834 12.3819 21.7834 12.8505 21.3277L17.6485 16.661C17.9933 16.3256 18.0945 15.8261 17.9071 15.3886C17.7197 14.9511 17.2849 14.6667 16.7976 14.6667L7.20159 14.6704C6.71804 14.6704 6.27947 14.9548 6.09205 15.3923C5.90463 15.8298 6.00958 16.3292 6.35069 16.6647L11.1487 21.3313L11.1524 21.3277Z'
    );
    path2.setAttribute('fill', ['#A19F9D', '#EDEBE9'][1]);

    svg.appendChild(path1);
    svg.appendChild(path2);

    // Append the SVG to the Custom Element's shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(svg);
  }
}
export class CdgSortingDesc extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.classList.add('cdg-sorting-desc');
    // Create a new SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '26');
    svg.setAttribute('viewBox', '0 0 24 26');
    svg.setAttribute('fill', 'none');

    const path1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    path1.setAttribute(
      'd',
      'M12.8476 4.34166C12.379 3.88611 11.6181 3.88611 11.1495 4.34166L6.35152 9.00651C6.00666 9.34179 5.90546 9.84108 6.09288 10.2784C6.2803 10.7157 6.71512 11 7.20242 11H16.7984C17.282 11 17.7205 10.7157 17.908 10.2784C18.0954 9.84108 17.9904 9.34179 17.6493 9.00651L12.8513 4.34166H12.8476Z'
    );
    path1.setAttribute('fill', ['#EDEBE9', '#A19F9D'][0]);

    const path2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    path2.setAttribute(
      'd',
      'M11.1524 21.3277C11.621 21.7834 12.3819 21.7834 12.8505 21.3277L17.6485 16.661C17.9933 16.3256 18.0945 15.8261 17.9071 15.3886C17.7197 14.9511 17.2849 14.6667 16.7976 14.6667L7.20159 14.6704C6.71804 14.6704 6.27947 14.9548 6.09205 15.3923C5.90463 15.8298 6.00958 16.3292 6.35069 16.6647L11.1487 21.3313L11.1524 21.3277Z'
    );
    path2.setAttribute('fill', ['#EDEBE9', '#A19F9D'][1]);

    svg.appendChild(path1);
    svg.appendChild(path2);
    // Append the SVG to the Custom Element's shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(svg);
  }
}
