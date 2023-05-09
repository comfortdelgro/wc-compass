export class CdgSpeedDial extends HTMLElement {
  constructor() {
    super();

    // Create the HTML for the component
    const template = `
      <style>
        /* Add your styles here */
      </style>
      <div class="speed-dial speed-dial--up">
        <div class="speed-dial__trigger">
          <span>+</span>
        </div>
        <ul class="speed-dial__actions">
        </ul>
      </div>
    `;

    // Attach the template to the element's DOM
    this.innerHTML = template;

    // Get the position and actions from the component's attributes
    const position = this.getAttribute('position') || 'up';
    const actionsStr = this.getAttribute('actions').replace(/'/g, '"');

    const actions = eval('(' + actionsStr + ')');

    // Get the elements from the DOM
    const speedDial = this.querySelector('.speed-dial');
    const trigger = this.querySelector('.speed-dial__trigger');
    const actionsList = this.querySelector('.speed-dial__actions');

    // Set the position class
    speedDial.classList.add(`speed-dial--${position}`);
    actionsList.classList.add(`speed-dial__actions--${position}`);
    // Add the actions to the list
    actions.forEach(({ name, icon, onClick }) => {
      const action = document.createElement('li');
      action.className = 'speed-dial__action';
      action.innerHTML = `
      <span class="speed-dial__action-icon">${icon}</span>
      <span class="speed-dial__action-name">${name}</span>
      `;
      action.classList.add(`speed-dial__action--${position}`);
      action.addEventListener('click', onClick);
      actionsList.appendChild(action);
    });

    // Add event listeners for mouse enter and leave
    trigger.addEventListener('mouseenter', () => {
      trigger.classList.add('open');
      actionsList.classList.add('open');
    });
    speedDial.addEventListener('mouseleave', () => {
      trigger.classList.remove('open');
      actionsList.classList.remove('open');
    });
  }
}