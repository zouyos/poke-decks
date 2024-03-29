const appendScore = (pokemons) => {
  for (const pokemon of pokemons) {
    let score = 50;

    if (pokemon.catch_rate <= 175 && pokemon.catch_rate > 120) {
      score += 50;
    }
    if (pokemon.catch_rate <= 120 && pokemon.catch_rate > 45) {
      score += 50;
    }
    if (pokemon.catch_rate <= 45 && pokemon.catch_rate > 3) {
      score += 50;
    }
    if (pokemon.catch_rate <= 3) {
      score += 250;
    }

    if (pokemon.types.length > 1) score += 20;

    if (pokemon.evolution && pokemon.evolution.pre) {
      score += 20;
      if (pokemon.evolution.pre.length > 1) score += 50;
    }

    if (
      ["Psykokwak", "Caninos", "Gravalanch", "Osselait", "Ossatueur"].includes(
        pokemon.name.fr
      ) ||
      pokemon.types.some((type) => ["Dragon"].includes(type.name))
    )
      score += 50;

    if (
      [
        "Bulbizarre",
        "Salamèche",
        "Carapuce",
        "Feunard",
        "Akwakwak",
        "Galopa",
        "Onix",
        "Dracolosse",
        "Insécateur",
        "Mackogneur",
        "Grolem",
        "Artikodin",
        "Électhor",
        "Sulfura",
      ].includes(pokemon.name.fr) ||
      ["Pokémon Ombre", "Pokémon Psy"].includes(pokemon.category)
    )
      score += 100;

    if (
      pokemon.category === "Pokémon Légendaire" ||
      [
        "Herbizarre",
        "Reptincel",
        "Carabaffe",
        "Voltali",
        "Pyroli",
        "Aquali",
        "Ronflex",
        "Lokhlass",
      ].includes(pokemon.name.fr)
    )
      score += 150;

    if (
      pokemon.category === "Pokémon Terrifiant" ||
      [
        "Pikachu",
        "Raichu",
        "Miaouss",
        "Mewtwo",
        "Florizarre",
        "Tortank",
        "Dracaufeu",
      ].includes(pokemon.name.fr)
    )
      score += 200;

    if (pokemon.name.fr === "Mew") score += 304;

    pokemon.score = score;
    for (const type of pokemon.types) {
      if (type.name === "Électrik") {
        type.name = "Électrique";
      }
    }
  }
};

const changeScoreColor = (pokemonName) => {
  switch (true) {
    case pokemonName === "Artikodin":
      return "#2980ef";
      break;
    case pokemonName === "Sulfura":
      return "#f9780e";
      break;
    case pokemonName === "Électhor":
      return "#fac000";
      break;
    case pokemonName === "Mew":
      return "#da70d6";
      break;
    case pokemonName === "Mewtwo":
      return "#9932cc";
      break;
    default:
      return "#dc3546";
      break;
  }
};

export { appendScore, changeScoreColor };
