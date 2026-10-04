/**
 * Shared utility functions for formatting and string transformations.
 */

/**
 * Format project category to clean display label
 * @param {string|string[]} category
 * @returns {string}
 */
export function formatCategory(category) {
  if (Array.isArray(category)) {
    return category.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(' & ');
  }
  if (typeof category === 'string') {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  return '';
}

/**
 * Format numbers with leading zeros (e.g. 1 -> "01")
 * @param {number|string} num
 * @returns {string}
 */
export function padZero(num) {
  const n = parseInt(num, 10);
  return isNaN(n) ? num : n < 10 ? `0${n}` : `${n}`;
}
