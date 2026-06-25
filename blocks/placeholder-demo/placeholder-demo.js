import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();

  block.innerHTML = `
    <h2>${placeholders.welcome}</h2>
    <button>${placeholders.readMore}</button>
  `;
}