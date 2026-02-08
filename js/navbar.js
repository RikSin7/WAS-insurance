/**
 * Navbar functionality for WAS Insurance
 * Handles desktop dropdowns and mobile menu
 */

// Navigate to quote page (used in mega menu CTA)
function submitForm() {
  window.location.href = '/quote.html';
}

/**
 * Initialize all navbar interactions
 * Call this after the navbar partial is loaded
 */
function initNavbar() {
  const header = document.getElementById('main-header');
  const dropdownContainer = document.getElementById('dropdown-container');
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  const allDropdowns = document.querySelectorAll('.dropdown-panel');

  // Exit early if navbar isn't loaded yet
  if (!header || !dropdownContainer) return;

  const logo = document.getElementById('header-logo');
  const logoWhite = document.getElementById('header-logo-white');

  let isDropdownOpen = false;
  let activeNavItem = null;
  let closeTimeout;

  // --- Desktop Dropdown Logic ---

  function openDropdown(dropdownId, navItem) {
    clearTimeout(closeTimeout);
    isDropdownOpen = true;
    activeNavItem = navItem;

    // Dark header style
    header.classList.add('bg-[#333333]', 'text-white');

    // Swap to white logo
    if (logo && logoWhite) {
      logo.classList.add('hidden');
      logoWhite.classList.remove('hidden');
    }

    // Reset all arrows
    document.querySelectorAll('.arrow-down, .arrow-down-white, .arrow-up, .arrow-up-white')
      .forEach(el => el.classList.add('hidden'));

    // Show white up arrow on active item
    const upWhite = activeNavItem?.querySelector('.arrow-up-white');
    if (upWhite) upWhite.classList.remove('hidden');

    // Show white down arrows on inactive dropdown items
    navItems.forEach(item => {
      if (item !== activeNavItem) {
        const downWhite = item.querySelector('.arrow-down-white');
        if (downWhite) downWhite.classList.remove('hidden');
      }
    });

    // Show selected dropdown
    allDropdowns.forEach(panel => panel.classList.add('hidden'));
    const targetDropdown = document.getElementById('dropdown-' + dropdownId);
    if (targetDropdown) targetDropdown.classList.remove('hidden');

    // Show overlay
    dropdownContainer.classList.remove('opacity-0', 'invisible');
    dropdownContainer.classList.add('opacity-100', 'visible');

    const overlay = document.getElementById('dropdown-overlay');
    if (overlay) {
      overlay.classList.remove('opacity-0', 'invisible');
      overlay.classList.add('opacity-100', 'visible');
    }
  }

  function closeDropdown() {
    closeTimeout = setTimeout(() => {
      isDropdownOpen = false;
      activeNavItem = null;

      // Reset header
      header.classList.remove('bg-[#333333]', 'text-white');

      // Restore dark logo
      if (logo && logoWhite) {
        logo.classList.remove('hidden');
        logoWhite.classList.add('hidden');
      }

      // Reset arrows to default (dark down arrows)
      document.querySelectorAll('.arrow-down').forEach(el => el.classList.remove('hidden'));
      document.querySelectorAll('.arrow-down-white, .arrow-up, .arrow-up-white')
        .forEach(el => el.classList.add('hidden'));

      // Hide dropdown
      dropdownContainer.classList.remove('opacity-100', 'visible');
      dropdownContainer.classList.add('opacity-0', 'invisible');

      const overlay = document.getElementById('dropdown-overlay');
      if (overlay) {
        overlay.classList.remove('opacity-100', 'visible');
        overlay.classList.add('opacity-0', 'invisible');
      }

      allDropdowns.forEach(panel => panel.classList.add('hidden'));
    }, 150);
  }

  // Hover events for nav items
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      openDropdown(item.getAttribute('data-dropdown'), item);
    });
    item.addEventListener('mouseleave', closeDropdown);
  });

  // Keep dropdown open when hovering over it
  dropdownContainer.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
  dropdownContainer.addEventListener('mouseleave', closeDropdown);

  header.addEventListener('mouseenter', () => {
    if (isDropdownOpen) clearTimeout(closeTimeout);
  });

  // --- Mobile Menu Logic ---

  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
    hamburgerIcon?.classList.add('hidden');
    closeIcon?.classList.remove('hidden');
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    document.body.style.overflow = '';
    hamburgerIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
  }

  mobileMenuToggle?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('translate-x-full');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  mobileMenuClose?.addEventListener('click', closeMobileMenu);

  // --- Mobile Accordion Logic ---

  document.querySelectorAll('.mobile-accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const accordionId = toggle.getAttribute('data-accordion');
      const content = document.getElementById('accordion-' + accordionId);
      const arrow = toggle.querySelector('.accordion-arrow');
      const label = toggle.querySelector('span');

      if (!content) return;

      const isOpen = !content.classList.contains('hidden');

      if (isOpen) {
        content.classList.add('hidden');
        arrow?.classList.add('rotate-180');
        label?.classList.remove('text-[#C53030]');
        label?.classList.add('text-[#0B254B]');
        arrow?.classList.remove('text-[#C53030]');
        arrow?.classList.add('text-gray-500');
      } else {
        content.classList.remove('hidden');
        arrow?.classList.remove('rotate-180');
        label?.classList.add('text-[#C53030]');
        label?.classList.remove('text-[#0B254B]');
        arrow?.classList.add('text-[#C53030]');
        arrow?.classList.remove('text-gray-500');
      }
    });
  });
}

// Make available globally for dynamic loading
window.initNavbar = initNavbar;
