'use client';

import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '@/context/ThemeContext';
import { EditDocument, Pallet } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { mode, toggleTheme } = useThemeContext();
  const router = useRouter()

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '95vh'
    }}>
      <Typography variant='inherit' fontSize={{xs:'4rem', sm:'5rem', md:'6rem', lg:'7rem'}} fontFamily={'anton'} textAlign={'center'} mb={2}>Task Manager</Typography>
      <Box sx={{
        display: 'flex',
        gap: 1
      }}>
        <Button variant='contained' onClick={()=>{router.push('/tasks')}} color='primary'><EditDocument /> Minhas Tarefas</Button>
        <Button variant='contained' onClick={toggleTheme} color={'inherit'} sx={{
          bgcolor: `${mode==='light'? "#1C2121": "#FFBD00"}`,
          color: `${mode==='light'? "#ffffff": "#1C2121"}`
        }}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </Box>
    </Container>
  );
}

