import { $, $all } from "./helper.js";
import { properties } from "./data.js";
import { initializeAutocomplete } from "./autocomplete.js";

/**
 * Fonction principale de recherche avec filtrage
 * @param {string} type - Type de bien (appartement, villa, terrain)
 * @param {string} location - Localisation recherchée
 * @param {number} maxPrice - Prix maximum
 * @returns {Array} - Propriétés filtrées
 */
export function searchProperties(
  type = "",
  location = "",
  maxPrice = Infinity,
) {
  return properties.filter((property) => {
    // Filtrage par type
    if (type && property.type !== type) {
      return false;
    }

    // Filtrage par localisation (insensible à la casse)
    if (
      location &&
      !property.location.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }

    // Filtrage par prix
    if (maxPrice && property.price > maxPrice) {
      return false;
    }

    return true;
  });
}

/**
 * Formate le prix en FCFA avec séparateurs
 * @param {number} price - Prix à formater
 * @returns {string} - Prix formaté
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}

/**
 * Crée l'HTML pour une carte de propriété
 * @param {Object} property - Objet propriété
 * @returns {string} - HTML de la carte
 */
export function createPropertyCard(property) {
  const priceText = property.rental
    ? `${formatPrice(property.price)} / louer`
    : formatPrice(property.price);

  return `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[500px] flex flex-col">
      <!-- IMAGE -->
      <div class="relative h-64 w-full overflow-hidden">
        <img
          src="${property.image}"
          class="w-full h-full object-cover transition-transform duration-700 hover:scale-110 group-hover:scale-110"
          alt="${property.title}"
        />

        <!-- BADGE TOP -->
        <span
          class="absolute top-4 left-4 ${property.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase"
        >
          ${property.badge}
        </span>

        <!-- PRIX -->
        <span
          class="absolute bottom-4 left-4 bg-black/70 text-white text-sm font-bold px-4 py-2 rounded-lg"
        >
          ${priceText}
        </span>
      </div>

      <!-- CONTENU -->
      <div class="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 class="text-xl font-bold mb-2">${property.title}</h3>
          <p class="text-gray-500 text-sm flex items-center gap-1 mb-4">
            <i class="bi bi-geo-alt"></i> ${property.location}
          </p>
          <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
            ${
              property.bedrooms > 0
                ? `
              <span class="flex items-center gap-1">
                <i class="bi bi-house-door"></i> ${property.bedrooms} ch.
              </span>
            `
                : ""
            }
            ${
              property.bathrooms > 0
                ? `
              <span class="flex items-center gap-1">
                <i class="bi bi-droplet"></i> ${property.bathrooms} sdb
              </span>
            `
                : ""
            }
            <span class="flex items-center gap-1">
              <i class="bi bi-arrows-fullscreen"></i> ${property.area}m²
            </span>
          </div>
        </div>
        <button
          class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
          data-property-id="${property.id}"
        >
          Voir détails
        </button>
      </div>
    </div>
  `;
}

/**
 * Affiche les résultats de recherche dans la grille
 * @param {Array} results - Résultats de la recherche
 */
export function displaySearchResults(results) {
  const productSection = $("#product");
  if (!productSection) {
    console.error("Section #product non trouvée");
    return;
  }

  const gridContainer = productSection.querySelector(".grid");
  if (!gridContainer) {
    console.error("Grille .grid non trouvée dans #product");
    return;
  }

  // Ajouter un titre de résultats si ce n'est pas déjà fait
  let resultsHeader = productSection.querySelector(".results-header");
  if (!resultsHeader) {
    resultsHeader = document.createElement("div");
    resultsHeader.className = "results-header mb-6 p-4 bg-blue-50 rounded-lg";
    productSection.insertBefore(resultsHeader, gridContainer);
  }

  if (results.length === 0) {
    resultsHeader.innerHTML = `
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          <i class="bi bi-search"></i> Aucun résultat trouvé
        </h3>
        <p class="text-gray-500">Essayez d'élargir vos critères de recherche</p>
      </div>
    `;

    gridContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-gray-400 text-lg">
          <i class="bi bi-house-x text-6xl mb-4 block"></i>
          Aucune propriété ne correspond à vos critères
        </div>
      </div>
    `;
    return;
  }

  resultsHeader.innerHTML = `
    <div class="text-center">
      <h3 class="text-xl font-semibold text-gray-700">
        <i class="bi bi-check-circle text-green-600"></i> 
        ${results.length} ${results.length === 1 ? "propriété trouvée" : "propriétés trouvées"}
      </h3>
    </div>
  `;

  gridContainer.innerHTML = results
    .map((property) => createPropertyCard(property))
    .join("");

  console.log(`Affichage de ${results.length} résultats`);
}

/**
 * Valide et nettoie les entrées du formulaire
 * @param {HTMLFormElement} form - Formulaire de recherche
 * @returns {Object} - Données validées
 */
export function validateSearchForm(form) {
  const type = form.typeOfHouse?.value || "";
  const location = form.location?.value.trim() || "";
  const priceText = form.SelectPrice?.value.trim() || "";

  // Nettoyer et convertir le prix
  let maxPrice = Infinity;
  if (priceText) {
    // Supprimer tous les caractères non numériques
    const cleanPrice = priceText.replace(/[^\d]/g, "");
    maxPrice = parseInt(cleanPrice) || Infinity;
  }

  return {
    type,
    location,
    maxPrice,
  };
}

/**
 * Initialise la fonctionnalité de recherche
 */
export function initializeSearch() {
  console.log("Initialisation de la recherche...");

  const searchForm = $("#SearchContainer");
  if (!searchForm) {
    console.error("Conteneur de recherche #SearchContainer non trouvé");
    return;
  }

  // Initialiser l'autocomplétion pour le champ de localisation
  const locationInput = searchForm.querySelector("#location");
  if (locationInput) {
    console.log("Initialisation de l'autocomplétion pour la localisation");
    initializeAutocomplete(locationInput);
  }

  const searchButton = searchForm.querySelector(
    'button[type="button"], button:not([type])',
  );
  if (!searchButton) {
    console.error("Bouton de recherche non trouvé");
    return;
  }

  console.log("Bouton de recherche trouvé, ajout de l'écouteur d'événement");

  // Gérer la soumission du formulaire
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clic sur le bouton de recherche détecté");

    try {
      const searchData = validateSearchForm(searchForm);
      console.log("Données de recherche:", searchData);

      const results = searchProperties(
        searchData.type,
        searchData.location,
        searchData.maxPrice,
      );
      console.log("Résultats trouvés:", results.length);

      displaySearchResults(results);

      // Faire défiler vers les résultats
      const productSection = $("#product");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      showNotification("Une erreur est survenue lors de la recherche", "error");
    }
  });

  console.log("Fonctionnalité de recherche initialisée avec succès");
}

/**
 * Affiche une notification à l'utilisateur
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification (success, error, info)
 */
function showNotification(message, type = "info") {
  // Créer une notification simple
  const notification = document.createElement("div");
  notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
    type === "error"
      ? "bg-red-500"
      : type === "success"
        ? "bg-green-500"
        : "bg-blue-500"
  } text-white`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Supprimer après 3 secondes
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
