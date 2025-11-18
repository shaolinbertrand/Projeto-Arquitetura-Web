const mongoose = require('mongoose');

// Definimos a estrutura do nosso dado (Schema)
const userSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  cargo: { 
    type: String, 
    required: true 
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Criamos o Model. O Mongoose vai criar uma coleção chamada 'users' no Mongo.
const User = mongoose.model('User', userSchema);

module.exports = User;
