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
      [
        "Psykokwak",
        "Caninos",
        "Gravalanch",
        "Osselait",
        "Ossatueur",
        "Goupix",
        "Ponyta",
        "Miaouss",
        "Persian",
      ].includes(pokemon.name.fr) ||
      pokemon.types.some((type) => ["Dragon"].includes(type.name))
    )
      score += 50;

    if (["Artikodin", "Électhor", "Sulfura"].includes(pokemon.name.fr))
      score += 80;

    if (
      [
        "Bulbizarre",
        "Salamèche",
        "Carapuce",
        "Pikachu",
        "Raichu",
        "Feunard",
        "Akwakwak",
        "Galopa",
        "Onix",
        "Dracolosse",
        "Insécateur",
        "Mackogneur",
        "Grolem",
      ].includes(pokemon.name.fr) ||
      ["Pokémon Ombre", "Pokémon Psy"].includes(pokemon.category)
    )
      score += 100;

    if (pokemon.name.fr === "Mewtwo") score += 103;

    if (
      pokemon.category === "Pokémon Légendaire" ||
      ["Herbizarre", "Reptincel", "Carabaffe", "Ronflex", "Lokhlass"].includes(
        pokemon.name.fr
      )
    )
      score += 150;

    if (
      pokemon.category === "Pokémon Terrifiant" ||
      [
        "Florizarre",
        "Tortank",
        "Dracaufeu",
        "Voltali",
        "Pyroli",
        "Aquali",
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

    if (["Pyroli", "Aquali", "Voltali", "Évoli"].includes(pokemon.name.fr)) {
      let eleEvos = ["Pyroli", "Aquali", "Voltali"];
      eleEvos = eleEvos.filter(
        (pokemonName) => pokemonName !== pokemon.name.fr
      );
      eleEvos = eleEvos.map((name) => {
        const pokedexId = pokemons.find(
          (item) => item.name.fr === name
        ).pokedex_id;
        const condition = pokemons.find((item) => item.name.fr === name)
          .evolution.pre[0].condition;
        const regularSprite = pokemons.find((item) => item.name.fr === name)
          .sprites.regular;
        return {
          name: name,
          pokedex_id: pokedexId,
          condition: condition,
          regularSprite: regularSprite,
        };
      });

      if (["Pyroli", "Aquali", "Voltali"].includes(pokemon.name.fr))
        pokemon.evolution.ele = eleEvos;

      if (pokemon.name.fr === "Évoli") pokemon.evolution.next = eleEvos;
    }
  }
};

const changeScoreColor = (pokemonName) => {
  switch (pokemonName) {
    case "Artikodin":
      return "#2980ef";
    case "Sulfura":
      return "#f9780e";
    case "Électhor":
      return "#fac000";
    case "Mew":
      return "#da70d6";
    case "Mewtwo":
      return "#9932cc";
    default:
      return "#dc3546";
  }
};

export { appendScore, changeScoreColor };
