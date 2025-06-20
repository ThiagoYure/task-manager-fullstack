import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Anton, Montserrat } from 'next/font/google';

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

const montserrat = Montserrat({
    subsets: ['latin'],
});

const lightTheme = createTheme({
    typography: {
        fontFamily: [
            anton,
            montserrat,
        ].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#0186FF',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FFBD00',
            contrastText: '#1C2121',
        },
        background: {
            default: '#EDFAFE',
            paper: '#D6EDFF'
        },
    },
});

export default lightTheme;
