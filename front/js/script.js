var nomePokemon = document.getElementById("formGroupExampleInput").value;
var tipoPokemon = document.getElementById("selectTipoPost");
var PokedexPokemon = document.getElementById("formGroupExampleInput3").value;
var form = document.querySelector("form");

getPokemonsSalvos();
selectTiposPost();

function atualizar(){
    limpar();
    getPokemonsSalvos();
}

async function getTiposSalvos() {
    const tiposPokemon = await fetch('http://localhost:3000/pokemon/tipos').then((res) => res.json())
    return tiposPokemon;
}

async function getPokemonsSalvos() {
    const resultado = await fetch('http://localhost:3000/pokemon');
    const pokemons = await resultado.json();
    for (let index in pokemons) {
        addPokemon(pokemons[index]);
    }
}

async function selectTiposPost() {
    const tipo =  await getTiposSalvos();
    var container = document.getElementById("selectTipoPost");
    for(index in tipo) {
        container.innerHTML += `<option value="${tipo[index]}">${tipo[index]}</option>`;
    }
}

async function selectTiposEdit(pokemonId) {
    const tipo =  await getTiposSalvos();
    var container = document.getElementById(`${pokemonId}_tipo`);
    for(index in tipo) {
        container.innerHTML += `<option value="${tipo[index]}">${tipo[index]}</option>`;
    }
}
//<span class="${pokemon.tipo} posicao-margin">${pokemon.tipo}</span>
function addPokemon(pokemon) {
    var add = document.getElementById("table-data");
    add.innerHTML += `
    <tr id="${pokemon._id}_view" class="view removerPokemon"> 

        <td class="nomePokemon">
            ${pokemon.nome}
        </td> 
        <td>
            <span class="${pokemon.tipo} posicao-margin">${pokemon.tipo}</span>
        </td> 

        <td>
            <img class="img-fluid" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png">
        </td> 

        <td>
            <button name="botao" type="button" onclick="removerPokemon('${pokemon._id}')" class="btn btn-danger">Remover</button>
            <button id="buttonEdit" name="botao" type="button" onclick="setEditMode('${pokemon._id}')" class="btn btn-warning">Editar</button>
        </td>
    </tr>`;

    add.innerHTML += `
        <tr id="${pokemon._id}_edit" class="edit removerPokemon"> 
            <td class="nomePokemon">
                <input class="inputEdit" type="text" id="${pokemon._id}_nome" value='${pokemon.nome}' />
            </td> 
            <td class="inputEdit">
                <select required id="${pokemon._id}_tipo" class="inputEdit">
                    <option selected value="">Selecione o tipo</option>
                    ${selectTiposEdit(pokemon._id)}
                </select>
            </td> 
            <td class="inputEdit">
                <input class="inputEdit" type="text"  id="${pokemon._id}_pokedex" value="${pokemon.pokedex}"/>
            </td> 
            <td>
                <button name="botao" type="button" onclick="alterarPokemon('${pokemon._id}')" class="btn btn-warning">Salvar</button>
                <button name="botao" type="button" onclick="cancelEditMode('${pokemon._id}')" class="btn btn-danger">Cancelar</button>
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

function removerPokemon(pokemonId) {
    fetch(`http://localhost:3000/pokemon/${pokemonId}`, {
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
    var tipo = document.getElementById(`${pokemonId}_tipo`);

    fetch(`http://localhost:3000/pokemon/${pokemonId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: document.getElementById(`${pokemonId}_nome`).value,
                pokedex: document.getElementById(`${pokemonId}_pokedex`).value,
                tipo: tipo.options[tipo.selectedIndex].value
            })  
      })
      .then((res) => res.json())
      .then((json) =>{
        atualizar();
        limpar();
      })
}
