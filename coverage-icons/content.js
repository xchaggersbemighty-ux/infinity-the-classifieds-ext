(function () {
  const ATTR = 'data-itc-icon';

  const CHECKMARK_SVG = `<svg width="15" height="15" viewBox="0 0 15 15"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 7.5L6 11.5L13 3.5"
      stroke="#16a34a" stroke-width="2.2"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const NOENTRY_SVG = `<svg width="15" height="15" viewBox="0 0 15 15"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="6"
      stroke="#dc2626" stroke-width="1.8"/>
    <line x1="3" y1="3" x2="12" y2="12"
      stroke="#dc2626" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`;

  function buildIcon(type) {
    const span = document.createElement('span');
    span.className = 'itc-coverage-badge';
    // The <li> is already display:flex, so margin-left:auto pushes to the right edge.
    span.style.cssText = 'margin-left: auto; flex-shrink: 0; display: inline-flex; align-items: center; pointer-events: none;';
    span.innerHTML = type === 'green' ? CHECKMARK_SVG : NOENTRY_SVG;
    span.title = type === 'green' ? 'Covered' : 'Not covered';
    return span;
  }

  function process() {
    // Green items use border-green-500, red items use border-red-500.
    document.querySelectorAll(`li.border-green-500:not([${ATTR}])`).forEach(li => {
      li.setAttribute(ATTR, 'green');
      li.appendChild(buildIcon('green'));
    });

    document.querySelectorAll(`li.border-red-500:not([${ATTR}])`).forEach(li => {
      li.setAttribute(ATTR, 'red');
      li.appendChild(buildIcon('red'));
    });
  }

  process();

  new MutationObserver(process).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
