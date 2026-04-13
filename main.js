/**
 * @typedef ProductsCard
 * @property {string?} badge
 * @property {string} title
 * @property {string} localisation
 * @property {{src: string, alt: {fr: string, en: string}}} image
 * @property {string} price
 *
 */

/**
 * @typedef serviceCards
 * @property {{icon: string, title: string}} serviceCardHeader
 * @property {{description: string,link:{href: string, text: string}}} serviceCardBody
 */
/**
 * @param {string} selector
 * @param {ParentNode} root
 * @returns {Element|null}
 */
const $ = (selector, root = document) => {
  if (!root || !root.querySelector) {
    throw new Error("root invalide");
  }
  return root.querySelector(selector);
};

/**
 * @param {string} selector
 * @param {ParentNode} root
 * @returns {Element[]}
 */
const $all = (selector, root = document) => {
  if (!root || !root.querySelectorAll) {
    throw new Error("root invalide");
  }
  return [...root.querySelectorAll(selector)];
};

const CardProductGenerator = (data, template) => {
  if (!template) {
    throw new Error("template introuvable");
  }

  const templateClone = template.content
    ? template.content.cloneNode(true)
    : template.cloneNode(true);

  const badgeElement = templateClone.querySelector(".card__badge");
  if (badgeElement) {
    if (data.badge) {
      badgeElement.textContent = data.badge;
    } else {
      badgeElement.style.display = "none";
    }
  }

  templateClone.querySelector(".card__title").textContent = data.title;
  const localisationSpan = templateClone.querySelector(
    ".card__localisation span",
  );
  if (localisationSpan) {
    localisationSpan.textContent = data.localisation;
  }

  const imageElement = templateClone.querySelector(".card__image");
  if (imageElement) {
    imageElement.src = data.image.src;
    imageElement.alt =
      $("html").lang === "en" ? data.image.alt.en : data.image.alt.fr;
  }

  templateClone.querySelector(".card__price").textContent = data.price;

  return templateClone;
};

/**
 * @type {HTMLTemplateElement}
 */
const TemplateProductCard = $("#template-ProductCard");

/**
 * @type {ProductsCard[]}
 */
const DataCardProducts = [
  {
    badge: "Exclusivité",
    title: "Penthouse Horizon",
    localisation: "Pointe-noire, centre ville",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7GxCS9DTMXTJjXEQMWPbJp9pkLhRNxSLrZMQIGcBnFFZMeM3cZ0mN6hAef1jC7aYcOeWsD22Y3qIyEmU0sN1SCqRksM8eDrXqgG5azIIFRW2f5rd9L5qeEXvxmknnakBOEaY5mWjRp4MpdjkkT-t7QGldi211ygga7-yzonZZhR_KM83i9m6Epn9QQlkPi-vg9BPSLUPQlg9s-Ugy4rir42vmhtWbi-mSR5L_tEc5Y8cKNPrWToQvZ88xnYZqAjI-u0mWfn91zeU",
      alt: {
        fr: "Appartement de luxe ultra moderne avec balcon et vue sur la ville de Pointe-Noire au crépuscule",
        en: "ultra modern penthouse apartment balcony view with glass railings and city lights of Pointe-Noire at twilight",
      },
    },
    price: "450.000.000 FCFA",
  },
  {
    badge: "Nouveau",
    title: "Villa Oasis Verte",
    localisation: "Brazzaville, Bacongo",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBlzW2kH7iU4oVsZNLv5zy7irc9vF_PknOEzGPVN0-U_232yIKeBWEb8hC6SBlOuXBpwtBEMdc8dflDMYafsJm4miZoWXModORyb8hONwmBCq5J_PtuN0pOyMROCsaR-8UvDMnyAZfNT1pE7vgaWKRBdD-X67hb1f084o59cooU1IwghKNwXMttOsHd44UpOigTN_fET9SpPm8k0OueTvC4Ch9sY7KRp3u8wY2lXtJB_WigRvmlcWwP4kfDTYIlS7ew4G24LV0xOQ",
      alt: {
        fr: "Villa contemporaine familiale avec grandes fenêtres au sol et jardin entretenu dans la zone résidentielle de Brazzaville",
        en: "contemporary family villa with large floor to ceiling windows and manicured garden in Brazzaville residential area",
      },
    },
    price: "275.000.000 FCFA",
  },
  {
    title: "Appartement Quartz",
    localisation: "Brazzaville, Centre Ville",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC42VLKKcO_E9E2dlk-JGXh7Uubgx8WN7unHoE2NqgnUKNjREECGyP596cuhSfXi3RmddecXDxx0d6Tjvt_1w-gJ5wrdKW23ROer-SQP13Im2cuFE0vEtkiVZzF-duq-m4v2Fvv1F1cRNW5b8PZyg3gQ0rDkQBrH1FxauaPCgRENgp7QgO83b0Gw1ev2unQk8yHcLenUUQI1WT2j6pjB1j8Mz_5YRXKpRWYlNKz-0WQ3Ms4aXPrR1kjQ56WG_63-Gjc9kUw_pRIzaA",
      alt: {
        fr: "Villa architecturale minimaliste avec lignes claires et facade de concrète blanche sous le ciel bleu clair",
        en: "minimalist architectural villa design with clean lines and white concrete facade under clear blue sky",
      },
    },
    price: "1 200 000 FCFA / mois",
  },
];
/**
 * @type {serviceCards[]}
 *
 */
const serviceCard = [
  {
    serviceCardHeader: {
      icon: "apartment",
      title: "Acheter",
    },
    serviceCardBody: {
      description:
        "Accédez aux meilleures offres du marche immobilier congolais avec un accompagnement juridique complet.",
      link: {
        text: "Découvrir les biens",
        href: "#",
      },
    },
  },
  {
    serviceCardHeader: {
      icon: "sell",
      title: "Vendre",
    },
    serviceCardBody: {
      description:
        "Vendez votre propriété au meilleur prix grâce à notre réseau d'investisseurs qualifiés.",
      link: {
        text: "Estimer mon bien",
        href: "#",
      },
    },
  },
  {
    serviceCardHeader: {
      icon: "apartment",
      title: "Louer",
    },
    serviceCardBody: {
      description:
        "Trouvez rapidement une location qui correspond à votre style de vie et à votre budget.",
      link: {
        text: "Voir les locations",
        href: "#",
      },
    },
  },
];

const productContainer = $("#product-grid");
if (!productContainer) {
  throw new Error("conteneur de cards introuvable");
}

DataCardProducts.forEach((cardProduct) => {
  productContainer.appendChild(
    CardProductGenerator(cardProduct, TemplateProductCard),
  );
});
