const cardElement = document.querySelector('#card');
const generateButton = document.querySelector('#card__generate-button');

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#ff0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#efb549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190ff",
};

const getPokemon = async () => {
  let pokemonID = Math.floor(Math.random() * 150) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  const pokemon = await response.json();
  return pokemon;
}

const showDetails = (pokemon) => {
  const cardElement = document.querySelector('#card');
  const hpElement = document.querySelector('#card__hp__value');
  const imageElement = document.querySelector('#card__image');
  const nameElement = document.querySelector('#card__name');
  const typesElement = document.querySelector('#card__types');
  const attackStatElement = document.querySelector('#card__attack__value');
  const defenseStatElement = document.querySelector('#card__defense__value');
  const speedStatElement = document.querySelector('#card__speed__value');

  hpElement.textContent = pokemon.stats[0].base_stat;
  imageElement.src = pokemon.sprites.other.dream_world.front_default;
  nameElement.textContent = pokemon.name;
  attackStatElement.textContent = pokemon.stats[1].base_stat;
  defenseStatElement.textContent = pokemon.stats[2].base_stat;
  speedStatElement.textContent = pokemon.stats[5].base_stat;

  typesElement.innerHTML = '';
  pokemon.types.forEach((item) => {
    typesElement.innerHTML += `<span>${item.type.name}</span>`
  });

  const themeColor = typeColor[pokemon.types[0].type.name];

  cardElement.style.backgroundImage = `radial-gradient(
    circle at 50% 0%, ${themeColor} 36%, white 36%
  )`;
}

const main = async () => {
  const loaderElement = document.querySelector('#card__loader');
  const cardInfoElement = document.querySelector('#card__info');

  loaderElement.classList.remove('card__loader--hidden');
  cardInfoElement.classList.add('card__info--hidden');
  const pokemon = await getPokemon();
  loaderElement.classList.add('card__loader--hidden');
  cardInfoElement.classList.remove('card__info--hidden');

  showDetails(pokemon);
}

generateButton.addEventListener('click', main);
window.addEventListener('load', main);