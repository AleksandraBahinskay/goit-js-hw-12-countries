// handlebars
import countryCardTpl from '../templates/country-card.hbs';
import countryCardNameTpl from '../templates/country-card-name.hbs';

// lodash
var debounce = require('lodash.debounce');

// pnotify
import { defaultModules, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import '@pnotify/core/dist/BrightTheme.css'; //color theme for error
import getRefs from './get-refs.js';
import API from './api-service.js';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

refs.inputRef.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  e.preventDefault();
  const form = e.target.value; //запрос который вводят
  let trimForm = form.trim();

  if (!trimForm) {
    clearContainer();
    return;
  }

  API.fetchCountryName(trimForm)
    .then(response => {
      if (response.length === 1) {
        renderCountryCard(response);
      } else if (response.length > 2 && response.length < 10) {
        renderCountryCardName(response);
      } else {
        error({
          title: `We didn’t find such a country.`,
          text: `Please check the correctness of the data entered and try again.`,
          delay: 2000,
        });
      }
    })
    .catch(error => console.log(error));
}

// render card with all info
function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.cardContainerRef.innerHTML = markup;
}

// render only name country
function renderCountryCardName(country) {
  const markup = countryCardNameTpl(country);
  refs.cardContainerRef.innerHTML = markup;
}

function clearContainer() {
  refs.cardContainerRef.innerHTML = '';
}
