const { default: axios } = require('axios');

const prompts = require('prompts');
const {
  codeToEmoji,
  generateTable,
  extractLatLong,
  extractLocation,
} = require('./utils');

require('dotenv').config();

(async () => {
  console.log('Welcome to weather app');
  const { location } = await prompts({
    type: 'text',
    name: 'location',
    message: 'What location are we checking the weather in?',
  });

  const locationRes = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.API_KEY}`
  );
  const { lat, lng } = extractLatLong(locationRes);

  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&timezone=Australia%2FSydney`
  );

  const table = generateTable(data);
  console.log('Seven Day forecast for: ' + extractLocation(locationRes));
  console.log(table.toString());
})();
