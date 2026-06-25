import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();

  block.innerHTML = `
    <h2>${placeholders.welcomeMessage}</h2>
    <button>${placeholders.buttonText}</button>
  `;
}