export default async function decorate(block) {
  // Read all rows after the header
  const config = {};

  [...block.children].forEach((row) => {
    const cells = row.children;

    if (cells.length === 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      config[key] = value;
    }
  });

  // Default coordinates (Nagpur) if not provided
  const latitude = config.latitude || '21.1458';
  const longitude = config.longitude || '79.0882';

  // Clear the existing table
  block.innerHTML = '<p>Loading weather...</p>';

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
    );

    const data = await response.json();

    block.innerHTML = `
      <div class="weather-card">
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${data.current.temperature_2m} °C</p>
        <p><strong>Humidity:</strong> ${data.current.relative_humidity_2m} %</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_speed_10m} km/h</p>
      </div>
    `;
  } catch (error) {
    block.innerHTML = '<p>Unable to load weather data.</p>';
    console.error(error);
  }
}
