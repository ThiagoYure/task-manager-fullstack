'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import Link from 'next/link';
import CreateTaskComponent from '@/components/CreateTaskComponent';

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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 5,
      width: 1
    }}>
      <Typography variant="h3">Lista de Tarefas</Typography>
      <CreateTaskComponent/>
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
