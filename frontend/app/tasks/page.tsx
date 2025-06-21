'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Box, Typography, List, ListItem, Checkbox, Button, Paper, Divider, Skeleton, Stack } from '@mui/material';
import CreateTaskComponent from '@/components/CreateTaskComponent';
import { Article, Edit, EditDocument, EditNoteRounded, Task } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SimpleDialog from '@/components/SimpleDialog';
import { useThemeContext } from '@/context/ThemeContext';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { mode, toggleTheme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Task>({
    _id: '',
    title: '',
    description: '',
    completed: false
  });

  const handleClickOpen = (task: Task) => {
    setSelectedValue(task);
    setOpen(true);
  };

  const handleClose = (value: {}, changed: boolean) => {
    const task: Task = value as Task;
    if (changed) {
      api.get('/tasks')
        .then(res => {
          setTasks(res.data)
        })
        .catch(err => console.error(err));
    }
    setOpen(false);
  };

  const handleCloseNewTask = (created: boolean) => {
    if (created) {
      api.get('/tasks')
        .then(res => {
          setTasks(res.data)
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    api.get('/tasks')
      .then(res => {
        setTasks(res.data)
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '95vh',
    }}>
      <Typography variant='inherit'
        fontSize={{ xs: '1rem', sm: '1rem', md: '2rem', lg: '4rem' }}
        fontFamily={'anton'}
        textAlign={'center'}
        mb={2}>Lista de Tarefas</Typography>
      <CreateTaskComponent onClose={handleCloseNewTask} />
      <List
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxHeight: 1, marginY: 4, padding: 2, borderRadius: 2, maxWidth: 500, gap: 2, bgcolor: 'background.paper' }}
        component="div"
      >
        {tasks.length > 0 ? (
          tasks.map((task: Task) => {
            return (
              <div key={task._id} style={{ fontFamily: 'montserrat' }}>
                <ListItemButton sx={{ border: 1, borderColor: `${mode === 'dark' ? '#fff' : '#7a7a7a'}`, borderRadius: 2 }} onClick={(e: any) => { handleClickOpen(task) }}>
                  <ListItemIcon>
                    <Article fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary={task.title} secondary={task.completed ? 'completa' : 'incompleta'} />
                  <EditNoteRounded fontSize='large' />
                </ListItemButton>
              </div>
            );
          })
        ) : (
          <Stack spacing={1}>
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
          </Stack>
        )}
      </List>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
