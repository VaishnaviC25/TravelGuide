export const getApiURL = cityName => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName},in&APPID=38e954cbdc7484d4d1814456c144a56e`;
};
