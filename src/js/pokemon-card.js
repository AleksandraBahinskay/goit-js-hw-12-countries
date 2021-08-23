// import '../css/pokemon-card.css';
import pokemonCardTpl from "../templates/pokemon-card.hbs";

// работа с бекендом
import API from "./api-service";

// получение рефов
import getRefs from "./get-refs";

const refs = getRefs();

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // console.log(form.elements);

  // значение инпута во время сабмита формы
  const searchQuery = form.elements.query.value;

  API.fetchPokemon(searchQuery)
    .then(renderPocemonCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}
refs.searchForm.addEventListener("submit", onSearch);

function renderPocemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  //   console.log(markup);

  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert("404");
}
