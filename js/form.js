/**
 * Quote Form functionality for WAS Insurance
 * Handles destination dropdown, chips, and traveller inputs
 */

// --- Destination Dropdown ---

function toggleDropdown() {
  const dropdown = document.getElementById('destination-dropdown');
  const chevron = document.getElementById('chevron-icon');

  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    chevron.style.transform = 'translateY(-50%) rotate(180deg)';
    document.getElementById('destination-input').focus();
  } else {
    dropdown.classList.add('hidden');
    chevron.style.transform = 'translateY(-50%) rotate(0deg)';
  }
}

// --- Destination Chips ---

function addChip(value) {
  const container = document.getElementById('selected-chips');

  // Prevent duplicates
  const exists = Array.from(container.children).some(
    chip => chip.getAttribute('data-value') === value
  );
  if (exists) return;

  const chip = document.createElement('span');
  chip.className = 'chip-item inline-flex items-center gap-2 bg-[#0B254B] text-white text-xs font-medium px-3 py-1.5 rounded-md fade-in';
  chip.setAttribute('data-value', value);
  chip.innerHTML = `
    ${value}
    <button type="button" onclick="removeChip(this)" class="hover:text-red-300 flex items-center justify-center">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="brightness-0 invert">
        <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  container.appendChild(chip);
  toggleDropdown();
  document.getElementById('destination-input').value = '';
}

function removeChip(button) {
  button.closest('.chip-item').remove();
}

// --- Destination Search Filter ---

function filterDestinations() {
  const input = document.getElementById('destination-input').value.toLowerCase();
  const dropdown = document.getElementById('destination-dropdown');
  const items = dropdown.querySelectorAll('li');
  const noResults = document.getElementById('no-results');

  // Open dropdown while typing
  if (dropdown.classList.contains('hidden')) toggleDropdown();

  let hasVisible = false;
  items.forEach(item => {
    const matches = item.textContent.toLowerCase().includes(input);
    item.style.display = matches ? 'block' : 'none';
    if (matches) hasVisible = true;
  });

  noResults.classList.toggle('hidden', hasVisible);
}

// --- Traveller Age Inputs ---

function addTraveller() {
  const container = document.getElementById('traveller-container');
  const button = container.querySelector('button');

  const wrapper = document.createElement('div');
  wrapper.className = 'w-20 relative';
  wrapper.innerHTML = `
    <input type="number" min="0" max="100" 
      class="w-full bg-white border border-gray-300 rounded-lg h-12 text-center text-gray-700 focus:outline-none focus:border-[#0B254B] focus:ring-1 focus:ring-[#0B254B]" 
      placeholder="Age">
  `;

  container.insertBefore(wrapper, button);
}

// --- Tab Switching (Single/Multi Trip) ---

function switchTab(type) {
  const single = document.getElementById('tab-btn-single');
  const multi = document.getElementById('tab-btn-multi');

  if (type === 'single') {
    single?.classList.add('bg-white', 'z-10');
    single?.classList.remove('bg-[#E5E7EB]', 'z-0');
    multi?.classList.add('bg-[#FDBA2E]', 'z-0');
    multi?.classList.remove('bg-white', 'z-10');
  } else {
    multi?.classList.add('bg-white', 'z-10');
    multi?.classList.remove('bg-[#FDBA2E]', 'z-0');
    single?.classList.add('bg-[#E5E7EB]', 'z-0');
    single?.classList.remove('bg-white', 'z-10');
  }
}

// --- Initialize Form ---

function initForm() {
  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const wrapper = document.getElementById('destination-wrapper');
    const dropdown = document.getElementById('destination-dropdown');
    const chevron = document.getElementById('chevron-icon');

    if (wrapper && dropdown && !wrapper.contains(event.target)) {
      dropdown.classList.add('hidden');
      if (chevron) chevron.style.transform = 'translateY(-50%) rotate(0deg)';
    }
  });
}

// Make available globally for dynamic loading
window.initForm = initForm;
