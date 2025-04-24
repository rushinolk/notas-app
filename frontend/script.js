document.addEventListener('DOMContentLoaded', () => {
  const API_BASE_URL = 'http://backend:3000'; // Alterado para usar o nome do serviço no compose
  const noteForm = document.getElementById('note-form');
  const notesList = document.getElementById('notes-list');

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error('Erro ao buscar notas');
      }
      const notes = await response.json();
      notesList.innerHTML = '';
      notes.forEach(note => {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <button onclick="editNote(${note.id})">Editar</button>
          <button onclick="deleteNote(${note.id})">Deletar</button>
        `;
        notesList.appendChild(noteItem);
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar nota');
      }

      const data = await response.json();
      console.log('Nota adicionada:', data);
      fetchNotes();
      noteForm.reset();
    } catch (error) {
      console.error('Erro:', error);
    }
  });

  window.editNote = async (id) => {
    const title = prompt('Novo título:');
    const content = prompt('Novo conteúdo:');

    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar nota');
      }

      const data = await response.json();
      console.log('Nota editada:', data);
      fetchNotes();
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  window.deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar nota');
      }

      console.log('Nota deletada');
      fetchNotes();
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  fetchNotes();
});