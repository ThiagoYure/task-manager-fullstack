'use client';

import { useState } from 'react';
import api from '@/services/api';
import { Box, Button, Checkbox, Dialog, DialogTitle, FormControlLabel, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Add, CloseRounded, HdrPlus, PlusOne } from '@mui/icons-material';

export interface NewTaskProps {
    onClose: (created: boolean) => void;
}

export default function CreateTaskComponent(props: NewTaskProps) {
    const { onClose } = props;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setLoading(false);
        setOpen(false);
        onClose(true);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const result = await api.post('/tasks', { title, description });
        if (result.status === 200) {
            setLoading(false);
            handleClose();
        } else {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', width: 0.25, fontFamily: 'montserrat' }}>
            <Button variant='contained' color='primary' size='medium' onClick={handleOpen} startIcon={<Add />} fullWidth> Nova Tarefa</Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle fontFamily={'montserrat'} width={500}>Nova Tarefa</DialogTitle>
                <IconButton
                    size="medium"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseRounded />
                </IconButton>
                <TextField sx={{ mx: 2, mt: 1, fontFamily: 'montserrat' }} id="filled-basic" label="Title" value={title} variant="filled" onChange={(e) => { setTitle(e.target.value) }} />
                <TextField sx={{ mx: 2, mt: 1, fontFamily: 'montserrat' }} id="filled-basic" label="Description" value={description} variant="filled" onChange={(e) => { setDescription(e.target.value) }} />

                <Box sx={{ display: 'flex', flexDirection: 'row', my: 3, mx: 2, gap: 2 }}>
                    <Button variant='contained' loading={loading} color='primary' size='medium' onClick={handleSubmit} fullWidth>Criar Tarefa</Button>
                    <Button variant='outlined' color='error' size='small' onClick={handleClose} fullWidth>Cancelar</Button>
                </Box>
            </Dialog>
        </Box>
    );
}
