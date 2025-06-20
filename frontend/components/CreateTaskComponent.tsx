'use client';

import { useState } from 'react';
import api from '@/services/api';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PlusOne } from '@mui/icons-material';

export default function CreateTaskComponent() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        await api.post('/tasks', { title, description });
        handleClose();
    };

    return (
        <Box sx={{bgcolor:'Background.default'}}>
            <Button onClick={handleOpen}><PlusOne/></Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
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
            </Modal>
        </Box>
    );
}
