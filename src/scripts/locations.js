// Données de localisations pour l'autocomplétion
// Vous pouvez facilement ajouter de nouvelles villes et quartiers ici

export const locations = [
  // Brazzaville - Capitale politique
  { city: "Brazzaville", district: "Plateau", full: "Brazzaville, Plateau" },
  { city: "Brazzaville", district: "Poto-Poto", full: "Brazzaville, Poto-Poto" },
  { city: "Brazzaville", district: "Moungali", full: "Brazzaville, Moungali" },
  { city: "Brazzaville", district: "Ouenzé", full: "Brazzaville, Ouenzé" },
  { city: "Brazzaville", district: "Bacongo", full: "Brazzaville, Bacongo" },
  { city: "Brazzaville", district: "Makélékélé", full: "Brazzaville, Makélékélé" },
  { city: "Brazzaville", district: "Centre-Ville", full: "Brazzaville, Centre-Ville" },
  { city: "Brazzaville", district: "Plateau des 15 Ans", full: "Brazzaville, Plateau des 15 Ans" },
  
  // Pointe-Noire - Capitale économique
  { city: "Pointe-Noire", district: "Centre-Ville", full: "Pointe-Noire, Centre-Ville" },
  { city: "Pointe-Noire", district: "Ngoyo", full: "Pointe-Noire, Ngoyo" },
  { city: "Pointe-Noire", district: "Tié-Tié", full: "Pointe-Noire, Tié-Tié" },
  { city: "Pointe-Noire", district: "Los Angeles", full: "Pointe-Noire, Los Angeles" },
  { city: "Pointe-Noire", district: "Zone Portuaire", full: "Pointe-Noire, Zone Portuaire" },
  { city: "Pointe-Noire", district: "Mvoumvou", full: "Pointe-Noire, Mvoumvou" },
  
  // Dolisie - Troisième ville
  { city: "Dolisie", district: "Centre", full: "Dolisie, Centre" },
  { city: "Dolisie", district: "Zone Industrielle", full: "Dolisie, Zone Industrielle" },
  { city: "Dolisie", district: "Cité Simili", full: "Dolisie, Cité Simili" },
  
  // Autres villes principales (à décommenter et compléter si nécessaire)
  /*
  { city: "Nkayi", district: "Centre-Ville", full: "Nkayi, Centre-Ville" },
  { city: "Owando", district: "Centre", full: "Owando, Centre" },
  { city: "Gamboma", district: "Centre", full: "Gamboma, Centre" },
  { city: "Impfondo", district: "Centre", full: "Impfondo, Centre" },
  { city: "Ouesso", district: "Centre", full: "Ouesso, Centre" },
  */
];

/**
 * Ajoute une nouvelle localisation à la liste
 * @param {string} city - Nom de la ville
 * @param {string} district - Nom du quartier
 */
export function addLocation(city, district) {
  const newLocation = {
    city: city,
    district: district,
    full: `${city}, ${district}`
  };
  locations.push(newLocation);
  console.log(`Nouvelle localisation ajoutée: ${newLocation.full}`);
}

/**
 * Retourne toutes les villes uniques
 * @returns {Array<string>} - Liste des villes
 */
export function getCities() {
  return [...new Set(locations.map(loc => loc.city))];
}

/**
 * Retourne les quartiers d'une ville spécifique
 * @param {string} city - Nom de la ville
 * @returns {Array<string>} - Liste des quartiers
 */
export function getDistricts(city) {
  return locations
    .filter(loc => loc.city.toLowerCase() === city.toLowerCase())
    .map(loc => loc.district);
}
