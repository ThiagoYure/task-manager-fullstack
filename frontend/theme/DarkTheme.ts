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
            montserrat
        ].join(','),
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#0186FF',
            contrastText: '#1C2121',
        },
        secondary: {
            main: '#FFBD00',
            contrastText: '#1C2121',
        },
        background: {
            default: '#1C2121',
            paper: '#454653'
        },
    },
});

export default lightTheme;
