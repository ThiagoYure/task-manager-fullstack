'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/services/api';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setCompleted(res.data.completed);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async () => {
    await api.put(`/tasks/${id}`, { title, completed });
    router.push('/tasks');
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${id}`);
    router.push('/tasks');
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Editar Tarefa</Typography>
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Box sx={{ mt: 2 }}>
        <Checkbox
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <Typography display="inline">Concluída</Typography>
      </Box>
      <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={handleSubmit}>
        Salvar
      </Button>
      <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
        Deletar
      </Button>
    </Box>
  );
}
