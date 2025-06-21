'use client'

import { useThemeContext } from "@/context/ThemeContext";
import { Button, Fab, Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

export default function FooterComponent() {
    const { mode, toggleTheme } = useThemeContext();
    const router = useRouter();

    return (
        <footer style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <Fab variant='circular' onClick={toggleTheme} color={'secondary'} sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </Fab>
            <Fab variant='circular' onClick={()=>{router.back()}} color={'primary'} sx={{
                position: 'absolute',
                top: 16,
                left: 16,
            }}>
                <ArrowBackIcon/>
            </Fab>
            <Typography variant="inherit" fontSize={'1rem'}
                fontFamily={'montserrat'}>&copy; Desenvolvido por Thiago Yure.</Typography>
        </footer>
    );
}