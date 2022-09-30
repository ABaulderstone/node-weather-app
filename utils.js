const Table = require('cli-table3');

const codeToEmoji = (code) => {
  //   0	Clear sky
  // 1, 2, 3	Mainly clear, partly cloudy, and overcast
  // 45, 48	Fog and depositing rime fog
  // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
  // 56, 57	Freezing Drizzle: Light and dense intensity
  // 61, 63, 65	Rain: Slight, moderate and heavy intensity
  // 66, 67	Freezing Rain: Light and heavy intensity
  // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
  // 77	Snow grains
  // 80, 81, 82	Rain showers: Slight, moderate, and violent
  // 85, 86	Snow showers slight and heavy
  // 95 *	Thunderstorm: Slight or moderate
  // 96, 99 *	Thunderstorm with slight and heavy hail
  switch (code) {
    case 0:
      return '☀️'; // ☀
    case 1:
      return '🌤';
    case 2:
      return '⛅️';
    case 3:
      return '🌥';
    case 45:
    case 48:
      return '🌫';
    case 51:
    case 53:
    case 55:
      return '🌦';
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return '🌧';
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return '🌨';
    case 95:
    case 96:
    case 99:
      return '⛈';
    default:
      return '🌤';
  }
};

const generateTable = (weatherData) => {
  const {
    daily: {
      time,
      weathercode,
      temperature_2m_max,
      temperature_2m_min,
      precipitation_sum,
      sunset,
    },
  } = weatherData;

  const table = new Table({
    head: ['Date', 'Min', 'Max', 'Type', 'Rainfall', 'Sunset'],
  });

  for (let i = 0; i < 7; i++) {
    table.push([
      time[i],
      temperature_2m_min[i],
      temperature_2m_max[i],
      codeToEmoji(weathercode[i]),
      precipitation_sum[i],
      sunset[i],
    ]);
  }
  return table;
};

const extractLatLong = (response) => {
  const { lat, lng } = response.data.results[0].geometry.location;
  return { lat, lng };
};

const extractLocation = (response) => {
  const { formatted_address } = response.data.results[0];
  return formatted_address;
};

module.exports = {
  codeToEmoji,
  generateTable,
  extractLatLong,
  extractLocation,
};
