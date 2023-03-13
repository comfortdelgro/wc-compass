import './../pages/home.html';
import './../components/accordion.html';
import './../components/alert.html';
import './../components/alert-badges.html';
import './../components/avatar.html';
import './../components/breadcrumbs.html';
import './../components/checkboxes.html';
import './../components/dashboard-side-card.html';
import './../components/footer.html';
import './../components/icon.html';
import './../components/button.html';
import './../components/cards.html';
import './../components/carousel.html';
import './../components/inline-loading.html';
import './../components/list-view.html';
import './../components/loading.html';
import './../components/modal.html';
import './../components/nav-rail.html';
import './../components/navbar.html';
import './../components/page-header.html';
import './../components/pagination.html';
import './../components/pill-badges.html';
import './../components/radios.html';
import './../components/status.html';
import './../components/action-bar.html';
import './../components/sub-header.html';
import './../components/tabs.html';
import './../components/text-field.html';
import './../components/sub-nav.html';
import './../components/table.html';
import './../components/dialog.html';
import './../components/dropdown.html';
import './../components/popover.html';
import './../components/progress.html';
import './../components/timeline.html';
import './../components/toggle.html';
import './../components/wizards.html';
import './../components/calendar.html';
import './../components/datepicker.html';
import './../components/tooltip.html';

const contentMap = {
  home: './../pages/home.html',
  accordion: './../components/accordion.html',
  alert: './../components/alert.html',
  alertBadges: './../components/alert-badges.html',
  avatar: './../components/avatar.html',
  breadcrumbs: './../components/breadcrumbs.html',
  checkboxes: './../components/checkboxes.html',
  dashboardSideCard: './../components/dashboard-side-card.html',
  footer: './../components/footer.html',
  icon: './../components/icon.html',
  dialog: './../components/dialog.html',
  dropdown: './../components/dropdown.html',
  button: './../components/button.html',
  cards: './../components/cards.html',
  carousel: './../components/carousel.html',
  inlineLoading: './../components/inline-loading.html',
  listView: './../components/list-view.html',
  loading: './../components/loading.html',
  modal: './../components/modal.html',
  navRail: './../components/nav-rail.html',
  navbar: './../components/navbar.html',
  pageHeader: './../components/page-header.html',
  pagination: './../components/pagination.html',
  pillBadges: './../components/pill-badges.html',
  radios: './../components/radios.html',
  status: './../components/status.html',
  actionBar: './../components/action-bar.html',
  subHeader: './../components/sub-header.html',
  tabs: './../components/tabs.html',
  textField: './../components/text-field.html',
  subNav: './../components/sub-nav.html',
  table: './../components/table.html',
  popover: './../components/popover.html',
  progress: './../components/progress.html',
  toggle: './../components/toggle.html',
  timeline: './../components/timeline.html',
  wizards: './../components/wizards.html',
  calendar: './../components/calendar.html',
  datepicker: './../components/datepicker.html',
  tooltip: './../components/tooltip.html',
};

const documentContent = [
  {
    name: 'Layouts',
    id: 'layouts',
    icon: 'grid',
    children: [
      {
        name: 'Accordion',
        slug: 'accordion',
      },
      {
        name: 'Action Bar',
        slug: 'actionBar',
      },
      {
        name: 'Alert',
        slug: 'alert',
      },
      {
        name: 'Breadcrumbs',
        slug: 'breadcrumbs',
      },
      {
        name: 'Cards',
        slug: 'cards',
      },
      {
        name: 'Carousel',
        slug: 'carousel',
      },
      {
        name: 'Dashboard Side Card',
        slug: 'dashboardSideCard',
      },
      {
        name: 'Page Header',
        slug: 'pageHeader',
      },
      {
        name: 'List View',
        slug: 'listView',
      },
      {
        name: 'Sub Header',
        slug: 'subHeader',
      },
      {
        name: 'Modal',
        slug: 'modal',
      },
      {
        name: 'Dialog',
        slug: 'dialog',
      },
      {
        name: 'Nav Rail',
        slug: 'navRail',
      },
      {
        name: 'Navbar',
        slug: 'navbar',
      },
      {
        name: 'Sub Nav',
        slug: 'subNav',
      },
      {
        name: 'Table',
        slug: 'table',
      },
      {
        name: 'Timeline',
        slug: 'timeline',
      },
      {
        name: 'Footer',
        slug: 'footer',
      },
    ],
  },
  {
    name: 'Form Controls',
    id: 'formControls',
    icon: 'clipBoard',
    children: [
      {
        name: 'Calendar',
        slug: 'calendar',
      },
      {
        name: 'Checkboxes',
        slug: 'checkboxes',
      },
      {
        name: 'Datepicker',
        slug: 'datepicker',
      },
      {
        name: 'Dropdown',
        slug: 'dropdown',
      },
      {
        name: 'Text Field',
        slug: 'textField',
      },
      {
        name: 'Radios',
        slug: 'radios',
      },
      {
        name: 'Toggle',
        slug: 'toggle',
      },
    ],
  },
  {
    name: 'UI Controls',
    id: 'ui-controls',
    icon: 'shapes',
    children: [
      {
        name: 'Avatar',
        slug: 'avatar',
      },
      {
        name: 'Alert Badges',
        slug: 'alertBadges',
      },
      {
        name: 'Button',
        slug: 'button',
      },
      {
        name: 'Icon',
        slug: 'icon',
      },
      {
        name: 'Inline Loading',
        slug: 'inlineLoading',
      },
      {
        name: 'Loading',
        slug: 'loading',
      },
      {
        name: 'Pagination',
        slug: 'pagination',
      },
      {
        name: 'Pill Badges',
        slug: 'pillBadges',
      },
      {
        name: 'Status',
        slug: 'status',
      },
      {
        name: 'Tabs',
        slug: 'tabs',
      },
      {
        name: 'Tooltip',
        slug: 'tooltip',
      },
      {
        name: 'Popover',
        slug: 'popover',
      },
      {
        name: 'Progress',
        slug: 'progress',
      },
      {
        name: 'Wizards',
        slug: 'wizards',
      },
    ],
  },
];

function downloadHTMLContent(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { cache: 'no-cache' })
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('Loaded file is not valid HTML File"'));
        }
      })
      .catch(() => {
        reject(new Error('Error loading HTML'));
      });
  });
}

const content = document.querySelector('#component-content');
const scriptElement = document.querySelector('#sample-script');

let activatedMenu = null;
let activeParent = null;

function isParentContains(menu, child) {
  if (menu.children.length) {
    return menu.children.find((item) => item.slug === child);
  }
  return false;
}

function findParentMenu(hash) {
  return documentContent.find((item) => isParentContains(item, hash));
}

function activeMenu(hash) {
  setTimeout(() => {
    // Handle main nav active states
    if (activeParent) {
      activeParent.forEach((element) => {
        element.classList.remove('active');
      });
    }

    const parent = findParentMenu(hash);
    if (parent) {
      activeParent = document.querySelectorAll('#' + parent.id);

      activeParent.forEach((element) => {
        element.classList.add('active');
      });

      showSubMenu(parent);
    }

    if (activatedMenu) {
      activatedMenu.forEach((element) => {
        element.classList.remove('active');
      });
    }

    activatedMenu = document.querySelectorAll('[href="#' + hash + '"]');
    activatedMenu.forEach((element) => {
      element.classList.add('active');
    });

    // Close menu
    document.querySelector('cdg-nav-rail').open = false;
  });
}

function handlePageChange(url) {
  // Remove old script
  scriptElement.textContent = '';

  const lastPrams = url.split('#')[1] || 'home';
  const hash = lastPrams.split('?')[0];
  activeMenu(hash);
  if (hash === 'home') {
    document.querySelector('cdg-sub-nav').classList.add('hide');
  } else {
    document.querySelector('cdg-sub-nav').classList.remove('hide');
  }

  downloadHTMLContent(contentMap[hash]).then((data) => {
    content.innerHTML = data;

    // Make demo script works
    const scriptElement = content.querySelector('script');
    if (scriptElement) {
      eval(scriptElement.innerHTML);
    }

    // Wait for content render
    setTimeout(() => {
      hljs.highlightAll();
    }, 10);
  });
}

window.addEventListener('hashchange', function (event) {
  handlePageChange(event.newURL);
});

const subTitle = document.querySelector('.cdg-sub-nav-title');
const subNav = document.querySelector('.cdg-sub-nav-group-content');

function createSubMenu(item) {
  const menu = document.createElement('a');
  menu.classList.add('cdg-sub-nav-item');
  menu.textContent = item.name;
  menu.setAttribute('href', '#' + item.slug);

  return menu;
}

function showSubMenu(data, first) {
  subNav.textContent = '';
  subTitle.textContent = data.name;
  if (data.children.length) {
    data.children.forEach((item) => {
      subNav.appendChild(createSubMenu(item));
    });
  }

  if (first) {
    window.location.href = '#' + data.children[0].slug;
  }
}

function createNavMenu(item) {
  const menu = document.createElement('a');
  menu.classList.add('cdg-nav-item');
  menu.setAttribute('id', item.id);
  if (item.slug) {
    menu.setAttribute('href', '#' + item.slug);
  } else {
    menu.addEventListener('click', () => showSubMenu(item, true));
  }

  const menuIcon = document.createElement('cdg-icon');
  menuIcon.setAttribute('name', item.icon);
  // menuIcon.setAttribute('source', 'host');

  const menuText = document.createElement('span');
  menuText.textContent = item.name;

  menu.appendChild(menuIcon);
  menu.appendChild(menuText);

  return menu;
}

document.onreadystatechange = () => {
  handlePageChange(window.location.href);
};

const navRail = document.querySelector('.cdg-nav-rail-body');
documentContent.forEach((item) => {
  navRail.appendChild(createNavMenu(item));
});
