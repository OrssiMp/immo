/**
 * @param {string} selector
 * @param {ParentNode} root
 * @returns {Element|null}
 */
export const $ = (selector, root = document) => {
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
export const $all = (selector, root = document) => {
  if (!root || !root.querySelectorAll) {
    throw new Error("root invalide");
  }
  return [...root.querySelectorAll(selector)];
};
