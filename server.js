const express = require('express');
const mongoose = require('mongoose'); // 1. Importar o Mongoose
const userController = require('./controllers/userController');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

// 2. Conectar ao MongoDB (Substitua pela SUA string de conexão)
// DICA: Em produção, use variáveis de ambiente (.env)!
mongoose.connect('mongodb://127.0.0.1:27017/arquiteturaWeb')
  .then(() => console.log('🔥 Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar no Mongo:', err));

// Rotas (Vamos adicionar as de Update e Delete já já)
app.get('/', (req, res) => res.redirect('/users'));
app.get('/users', userController.getAllUsers);
app.get('/users/new', userController.getNewUserForm);
app.post('/users', userController.createNewUser);

// --- NOVAS ROTAS PARA O CRUD COMPLETO ---
// Rota para DELETAR (Usando POST pois HTML Forms não suportam DELETE nativo facilmente)
app.post('/users/delete/:id', userController.deleteUser);

// Rotas para EDITAR (1 para ver o form, 1 para salvar)
app.get('/users/edit/:id', userController.getEditUserForm);
app.post('/users/update/:id', userController.updateUser);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
