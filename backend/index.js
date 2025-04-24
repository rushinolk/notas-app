const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Health check endpoint (obrigatório para ECS)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/notes', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM notes');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar notas:', error);
    res.status(500).json({ error: 'Erro ao buscar notas' });
  }
});

app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar nota:', error);
    res.status(500).json({ error: 'Erro ao adicionar nota' });
  }
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao editar nota:', error);
    res.status(500).json({ error: 'Erro ao editar nota' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM notes WHERE id = $1', [id]);
    res.json({ message: 'Nota deletada' });
  } catch (error) {
    console.error('Erro ao deletar nota:', error);
    res.status(500).json({ error: 'Erro ao deletar nota' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});