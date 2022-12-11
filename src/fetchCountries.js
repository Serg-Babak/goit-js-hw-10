const BASE_URL = "https://restcountries.com/v2";
const PARAMETRIES_FILTER = "name,capital,population,flags,languages";
function fetchCountryByName(name) {
  return fetch(`${BASE_URL}//name/${name}?${PARAMETRIES_FILTER}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export default { fetchCountryByName };