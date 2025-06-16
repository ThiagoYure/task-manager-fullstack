'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import Link from 'next/link';

type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4">Lista de Tarefas</Typography>
      <Link href="/tasks/new">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Nova Tarefa
        </Button>
      </Link>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id}>
            <Checkbox checked={task.completed} />
            <Typography>{task.title}</Typography>
            <Link href={`/tasks/${task._id}/edit`}>
              <Button sx={{ ml: 2 }} variant="outlined">Editar</Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
