import './css/styles.css';
import API from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

  
    function onInputSearch(event) {
  const query = event.target.value;
      event.target.value = query;
      if (query.trim()) {
        API.fetchCountryByName(query).then(renderMarkup).catch(onFetchError);
      }
    }
function getCountries(data) {
  const countriesList = data
    .map(({ flags, name }) => {
      return `<li class="list__item">
                <p class="item__container"><img class="list__img" width='60' height='40' src='${flags.svg}'/></p>
                <p class="list__text">${name}</p>
          </li>`;
    })
    .join('');
  refs.countryList.innerHTML = countriesList;
}

function getCountryByName(data) {
  const countryInfo = data
    .map(({ flags, name, languages, population, capital }) => {
      return `<div class="country__container">
              <p class="img__container">
                <img class="country__img" width='280' height='186' src='${flags.svg}'/>
              </p>
          <p class="country__name">${name}</p>
          <p class="country__property">Capital: <span class="property__value">${capital}</span></p>
          <p class="country__property">Population: <span class="property__value">${population}</span></p>
          <p class="country__property">Languages: <span class="property__value">${languages
            .map(element => element.name)
            .join(', ')}</span></p>
          </div>`;
    })
    .join('');
  refs.countryInfo.innerHTML = countryInfo;
}

function deleteCountry() {
  refs.countryInfo.innerHTML = '';

}

function deleteCountries() {
  refs.countryList.innerHTML = '';
}

function renderMarkup(countries) {
  if (countries.length >= 10) {
    deleteCountry();
    deleteCountries();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countries.length >= 2 && countries.length < 10) {
    deleteCountry();
    getCountries(countries);
    return;
  }
getCountryByName(countries);
  deleteCountries();
}
function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
  deleteCountry();
  deleteCountries();
}

refs.searchInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));