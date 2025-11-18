const User = require('../models/User');

const userController = {

  // READ: Buscar todos
  getAllUsers: async (req, res) => {
    try {
      // O Mongoose busca no banco (aguarda a promessa)
      const users = await User.find(); 
      res.render('usersList', { usuarios: users });
    } catch (error) {
      res.status(500).send("Erro ao buscar usuários: " + error.message);
    }
  },

  // Renderizar form de criação (Não muda nada, pois não acessa banco)
  getNewUserForm: (req, res) => {
    res.render('formUsuario');
  },

  // CREATE: Salvar no Banco
  createNewUser: async (req, res) => {
    try {
      const novoUsuario = {
        nome: req.body.nome_usuario,
        cargo: req.body.cargo_usuario
      };
      
      // Mágica do Mongoose: cria e salva numa linha só
      await User.create(novoUsuario);
      
      // PRG Pattern
      res.redirect('/users');
    } catch (error) {
      res.status(500).send("Erro ao criar usuário: " + error.message);
    }
  },

  // --- NOVO: DELETE ---
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id; // Pega o ID da URL
      await User.findByIdAndDelete(id); // Mongoose remove pelo ID
      res.redirect('/users');
    } catch (error) {
      res.status(500).send("Erro ao deletar: " + error.message);
    }
  },

  // --- NOVO: UPDATE (Parte 1 - Mostrar o Form Preenchido) ---
  getEditUserForm: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id); // Busca o usuário para preencher os inputs
      res.render('editUsuario', { user: user });
    } catch (error) {
      res.status(500).send("Erro ao buscar para editar");
    }
  },

  // --- NOVO: UPDATE (Parte 2 - Salvar Alteração) ---
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const dadosAtualizados = {
        nome: req.body.nome_usuario,
        cargo: req.body.cargo_usuario
      };
      // Busca pelo ID e atualiza
      await User.findByIdAndUpdate(id, dadosAtualizados);
      res.redirect('/users');
    } catch (error) {
      res.status(500).send("Erro ao atualizar");
    }
  }
};

module.exports = userController;
