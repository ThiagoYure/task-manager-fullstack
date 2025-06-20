import { Typography } from "@mui/material";

export default function FooterComponent() {
    return (
        <footer style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <Typography variant="inherit" fontSize={'1rem'} 
            fontFamily={'montserrat'}>&copy; Desenvolvido por Thiago Yure.</Typography>
        </footer>
    );
}