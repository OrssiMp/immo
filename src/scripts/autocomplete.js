import { $, $all } from "./helper.js";
import { locations } from "./locations.js";

/**
 * Crée le dropdown d'autocomplétion
 * @param {HTMLInputElement} input - Champ de saisie
 * @returns {HTMLElement} - Élément dropdown
 */
function createAutocompleteDropdown(input) {
  const dropdown = document.createElement("div");
  dropdown.className =
    "autocomplete-dropdown absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 hidden";
  dropdown.style.marginTop = "4px";

  // Positionner le dropdown par rapport à l'input
  const rect = input.getBoundingClientRect();
  const parent = input.parentElement;
  parent.style.position = "relative";
  parent.appendChild(dropdown);

  return dropdown;
}

/**
 * Affiche les suggestions dans le dropdown
 * @param {HTMLElement} dropdown - Élément dropdown
 * @param {Array} suggestions - Liste des suggestions
 * @param {HTMLInputElement} input - Champ de saisie
 */
function showSuggestions(dropdown, suggestions, input) {
  if (suggestions.length === 0) {
    dropdown.innerHTML = `
      <div class="p-3 text-gray-500 text-sm">
        <i class="bi bi-search"></i> Aucune localisation trouvée
      </div>
    `;
  } else {
    dropdown.innerHTML = suggestions
      .map(
        (loc) => `
        <div class="autocomplete-item px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors">
          <div class="flex items-center gap-3">
            <i class="bi bi-geo-alt-fill text-blue-600"></i>
            <div>
              <div class="font-semibold text-gray-800">${loc.city}</div>
              <div class="text-sm text-gray-600">${loc.district}</div>
            </div>
          </div>
        </div>
      `,
      )
      .join("");

    // Ajouter les écouteurs d'événements pour chaque suggestion
    const items = dropdown.querySelectorAll(".autocomplete-item");
    items.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        input.value = suggestions[index].full;
        hideDropdown(dropdown);
        input.focus();

        // Déclencher un événement input pour notifier le changement
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });

      // Gérer le survol pour améliorer l'UX
      item.addEventListener("mouseenter", () => {
        items.forEach((i) => i.classList.remove("bg-blue-100"));
        item.classList.add("bg-blue-100");
      });
    });
  }

  dropdown.classList.remove("hidden");
}

/**
 * Masque le dropdown
 * @param {HTMLElement} dropdown - Élément dropdown
 */
function hideDropdown(dropdown) {
  dropdown.classList.add("hidden");
}

/**
 * Filtre les localisations selon la saisie
 * @param {string} query - Texte saisi
 * @returns {Array} - Localisations filtrées
 */
function filterLocations(query) {
  if (!query || query.length < 2) return [];

  const queryLower = query.toLowerCase();
  return locations
    .filter(
      (loc) =>
        loc.city.toLowerCase().includes(queryLower) ||
        loc.district.toLowerCase().includes(queryLower) ||
        loc.full.toLowerCase().includes(queryLower),
    )
    .slice(0, 8); // Limiter à 8 résultats
}

/**
 * Initialise l'autocomplétion pour un champ de saisie
 * @param {HTMLInputElement} input - Champ de saisie
 */
export function initializeAutocomplete(input) {
  if (!input) return;

  const dropdown = createAutocompleteDropdown(input);
  let debounceTimer;

  // Gérer la saisie
  input.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    // Debounce pour éviter trop de recherches
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (query.length >= 2) {
        const suggestions = filterLocations(query);
        showSuggestions(dropdown, suggestions, input);
      } else {
        hideDropdown(dropdown);
      }
    }, 300);
  });

  // Gérer le focus
  input.addEventListener("focus", () => {
    const query = input.value.trim();
    if (query.length >= 2) {
      const suggestions = filterLocations(query);
      showSuggestions(dropdown, suggestions, input);
    }
  });

  // Gérer la perte de focus (avec délai pour permettre le clic sur les suggestions)
  input.addEventListener("blur", () => {
    setTimeout(() => hideDropdown(dropdown), 200);
  });

  // Gérer les touches du clavier
  input.addEventListener("keydown", (e) => {
    const items = dropdown.querySelectorAll(".autocomplete-item");
    let selectedIndex = -1;

    // Trouver l'index sélectionné
    items.forEach((item, index) => {
      if (item.classList.contains("bg-blue-100")) {
        selectedIndex = index;
      }
    });

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (selectedIndex < items.length - 1) {
          if (selectedIndex >= 0)
            items[selectedIndex].classList.remove("bg-blue-100");
          items[selectedIndex + 1].classList.add("bg-blue-100");
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (selectedIndex > 0) {
          items[selectedIndex].classList.remove("bg-blue-100");
          items[selectedIndex - 1].classList.add("bg-blue-100");
        }
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          items[selectedIndex].click();
        }
        break;

      case "Escape":
        hideDropdown(dropdown);
        break;
    }
  });

  // Cliquer en dehors pour fermer
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      hideDropdown(dropdown);
    }
  });
}
