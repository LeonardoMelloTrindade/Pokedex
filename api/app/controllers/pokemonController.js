import { listarTipos, listarPokemons, salvarPokemon, deletarPokemon, editarPokemon } from "../services/pokemonService";

export default function (app) {
    
    app.get("/pokemon/tipos", async (req, res) => {
         try {

            var tipos = await listarTipos();            
            res.json(tipos);

        } catch (error) {
  
            console.error(error);
            throw new Error('Ocorreu um erro na listagem de tipos');
        } finally {
           console.log('chego no finally get tipos') 
        }
    });

    app.get("/pokemon", async (req, res) => {

        try {
            var pokemon = await listarPokemons();
     
            res.json(pokemon);

        } catch (error) {
      
            console.error(error);
            throw new Error('Ocorreu um erro na listagem de pokemon');
        } finally {
            console.log('chego no finally get pokemons') 
        }
    });

    app.post("/pokemon", async (req, res) => {

        try {
        
            var pokemonSalvo = await salvarPokemon(req.body);
            res.json(pokemonSalvo);

        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro na criacao do pokemon');
        } finally {
            console.log('chego no finally post') 
        }
    });

    app.delete("/pokemon/:id", async (req, res) => {

        try {
            var pokemonId = req.params.id;
            var deletedPokemon = await deletarPokemon(pokemonId);
            res.json(deletedPokemon);

        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao deletar o pokemon');
        } finally {
            console.log('chego no finally delete') 
        }
    });

    app.put("/pokemon/:id", async (req, res) => {

        try {
            var pokemonId = req.params.id;
            var pokemon = req.body;
            var updatedPokemon = await editarPokemon(pokemonId, pokemon);
            res.json(updatedPokemon);

        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao deletar o pokemon');
        } finally {
            console.log('chego no finally delete') 
        }
    });
}
