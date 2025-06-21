'use client'

import api from "@/services/api";
import { CheckBoxRounded, CloseRounded, UpdateTwoTone } from "@mui/icons-material";
import { Button, Checkbox, Dialog, DialogTitle, FormControlLabel, Switch, TextField, Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: Task;
    onClose: (value: {}, changed: boolean) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
    const [title, setTitle] = useState(selectedValue.title);
    const [description, setDesc] = useState(selectedValue.description);
    const [completed, setComp] = useState(selectedValue.completed);
    const [updatedTask, setUpdatedTask] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle(selectedValue.title);
        setDesc(selectedValue.description);
        setComp(selectedValue.completed);
    }, [open]);

    const handleClose = () => {
        if (!updatedTask) {
            onClose(updatedTask, true);
        } else {
            onClose(selectedValue, false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`/tasks/${selectedValue._id}`);
            setLoading(false);
            setUpdatedTask({});
            onClose({}, true);

        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);
        }
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await api.put(`/tasks/${selectedValue._id}`, {
                title: title,
                description: description,
                completed: completed
            });
            const updatedTaskData = response.data;

            setLoading(false);
            setUpdatedTask(updatedTaskData);
            onClose(updatedTaskData, true);

        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} sx={{ width: 1, fontFamily: 'montserrat' }} >
            <DialogTitle>Edite sua Tarefa</DialogTitle>
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
            <TextField sx={{mx: 2, mt: 1, fontFamily: 'montserrat'}} id="filled-basic" label="Title" value={title} variant="filled" onChange={(e) => { setTitle(e.target.value) }} />
            <TextField sx={{mx: 2, mt: 1, fontFamily: 'montserrat'}} id="filled-basic" label="Description" value={description} variant="filled" onChange={(e) => { setDesc(e.target.value) }} />
            <FormControlLabel sx={{mx: 1, mt: 2}} control={<Checkbox checked={completed} onChange={(e) => { setComp(e.target.checked) }} />} label="Completed" />
            <Box sx={{ display: 'flex', flexDirection: 'row', my: 3, mx: 2, gap:2 }}>
                <Button variant='contained' loading={loading} color='primary' size='medium' onClick={handleUpdate} fullWidth>Salvar alterações</Button>
                <Button variant='outlined' loading={loading} color='error' size='small' onClick={handleDelete} fullWidth>Deletar tarefa</Button>
            </Box>
        </Dialog>
    );
}