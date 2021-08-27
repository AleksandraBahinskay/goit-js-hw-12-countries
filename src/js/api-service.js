const BASE_URL = 'https://restcountries.eu/rest/v2';

// функция возвращает результат фетча( - промис) с распарсенными данными
function fetchCountryName(name) {
  return fetch(`${BASE_URL}/name/${name}`).then(response => {
    return response.json();
  });
}


export default { fetchCountryName };
