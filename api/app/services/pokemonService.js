import PokemonModel from "../model/pokemon.model";
import TipoModel from "../model/tipo.model";

export async function listarTipos() {
    var tipos = await TipoModel.find().lean();
    var tiposResult = tipos.map(function (tipo) {
        return tipo.nome;
    })
    return tiposResult;
}

export async function listarPokemons() {
    var pokemons = await PokemonModel.find().lean();
    return pokemons;
}

export async function salvarPokemon(pokemon) {
    var createdPokemon = new PokemonModel(pokemon);
    await createdPokemon.save();
    return "Salvou com sucesso";
}

export async function deletarPokemon(id) {
    await PokemonModel.findByIdAndDelete(id);
    return "Pokemon deletado com sucesso";
}

export async function editarPokemon(id, pokemon) {
    await PokemonModel.findByIdAndUpdate(id, pokemon);
    return "Pokemon atualizado com sucesso";
}