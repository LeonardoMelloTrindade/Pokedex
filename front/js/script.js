var nomePokemon = document.getElementById("formGroupExampleInput").value;
var tipoPokemon = document.getElementById("selectTipoPost");
var PokedexPokemon = document.getElementById("formGroupExampleInput3").value;
var form = document.querySelector("form");


getPokemonsSalvos();
getTiposSalvos();

function atualizar(){
    limpar();
    getPokemonsSalvos();
}

async function getTiposSalvos() {
    const tiposPokemon = await fetch('http://localhost:3000/pokemon/tipos').then((res) => res.json())
    selectTiposPost(tiposPokemon);
    selectTiposEdit(tiposPokemon);
}

async function getPokemonsSalvos() {
    const resultado = await fetch('http://localhost:3000/pokemon');
    const pokemons = await resultado.json();
    for (let index in pokemons) {
        addPokemon(pokemons[index]);
    }
}

function selectTiposPost(tipo) {
    var container = document.getElementById("selectTipoPost");
    for(index in tipo) {
        container.innerHTML += `<option value="${tipo[index]}">${tipo[index]}</option>`;
    }
}

function selectTiposEdit(tipo, pokemonId) {
    var container = document.getElementById(`${pokemonId}_SelectEdit`);
    for(index in tipo) {
        container.innerHTML += `<option value="${tipo[index]}">${tipo[index]}</option>`;
    }
}

function addPokemon(pokemon) {
    var add = document.getElementById("table-data");
    add.innerHTML += `<tr id="${pokemon._id}_view" class="view removerPokemon"> 
        <td class="nomePokemon">${pokemon.nome}</td> 
        <td> <span class="${pokemon.tipo} posicao-margin">${pokemon.tipo}</span></td> 
        <td><img class="img-fluid" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png"></td> 
        <td>
            <button name="botao" type="button" onclick="removerPokemon('${pokemon._id}')" class="btn btn-danger">Remover</button>
            <button name="botao" type="button" onclick="setEditMode('${pokemon._id}')" class="btn btn-warning">Editar</button>
        </td>
    </tr>`;

    add.innerHTML += `<tr id="${pokemon._id}_edit" class="edit removerPokemon"> 
        <td class="nomePokemon"><input type="text" id="${pokemon._id}_nome" value='${pokemon.nome}' /></td> 
        <td>
            <select required id="${pokemon._id}_SelectEdit">
                <option selected value="">escolha algo</option>
                ${getTiposSalvos()}
            </select></td> 
        <td><input type="text"  id="${pokemon._id}_pokedex" value="${pokemon.pokedex}"/></td> 
        <td>
            <button name="botao" type="button" onclick="alterarPokemon('${pokemon._id}')" class="btn btn-warning">Salvar</button>
            <button name="botao" type="button" onclick="cancelEditMode('${pokemon._id}')" class="btn btn-warning">Cancelar</button>
        </td>
    </tr>`;
}

function setEditMode(id){
    document.getElementById(`${id}_view`).style.display = 'none';
    document.getElementById(`${id}_edit`).style.display = 'block';
}

function cancelEditMode(id){
    document.getElementById(`${id}_view`).style.display = 'block';
    document.getElementById(`${id}_edit`).style.display = 'none';
    atualizar();
}

const esvaziarContainer = function () {
    document.getElementById("formGroupExampleInput").value = '';
    document.getElementById("selectTipo");
    document.getElementById("formGroupExampleInput3").value = '';
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    nomePokemon = document.getElementById("formGroupExampleInput").value;
    pokedexPokemon = document.getElementById("formGroupExampleInput3").value;
    tipoPokemon = tipoPokemon.options[tipoPokemon.selectedIndex].value;

    pokemon = {
        nome: nomePokemon,
        tipo: tipoPokemon,
        pokedex: pokedexPokemon
    }

    fetch('http://localhost:3000/pokemon', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon)
        }).then(function(pokemonn){
            console.log(pokemonn);
    })

    addPokemon(pokemon);
    esvaziarContainer();
})

function limpar() {
    var table = document.getElementById("table-data");
    table.innerHTML = '';
}

function removerPokemon(nome) {
    fetch(`http://localhost:3000/pokemon/${nome}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
          body: null
      })
      .then((res) => res.json())
      .then((json) => {
        atualizar();
      })
}

function alterarPokemon(pokemonId) {
    var nome = pokemonId + "_nome";
    var pokedex = pokemonId + "_pokedex";
    var tipo = document.getElementById("selectTipoEdit");

    console.log(document.getElementById(nome).value)
    console.log(document.getElementById(pokedex).value)

    fetch(`http://localhost:3000/pokemon/${pokemonId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: document.getElementById(nome).value,
                pokedex: document.getElementById(pokedex).value,
                tipo: tipo.options[tipo.selectedIndex].value
            })  
      })
      .then((res) => res.json())
      .then((json) =>{
        limpar();
        atualizar();
      })
}
