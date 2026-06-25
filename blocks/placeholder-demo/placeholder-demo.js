import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();
  console.log("placeholder= ",placeholders);
  console.log(JSON.stringify(placeholders, null, 2));
  console.log("keys:", Object.keys(placeholders));

  block.innerHTML = `
    <h2>${placeholders.welcome}</h2>
    <button>${placeholders.readMore}</button>
  `;
}