'use client';

import { useState } from 'react';
import api from '@/services/api';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    await api.post('/tasks', { title, description });
    router.push('/tasks');
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Nova Tarefa</Typography>
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
        Criar
      </Button>
    </Box>
  );
}
