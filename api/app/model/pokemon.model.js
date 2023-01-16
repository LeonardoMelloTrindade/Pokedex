import mongoose, { Schema } from 'mongoose';

var PokemonSchema = new Schema({
    nome: { type: String},
    tipo: { type: String},
    pokedex: { type: String }
    //imagem: { type: String },
});

export default mongoose.model('Pokemon', PokemonSchema);
 