import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider} from "@/context/ThemeContext";
import FooterComponent from "../components/FooterComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager App",
  description: "App de gerenciamento de Tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{
        height: '100vh'
      }}>
        <ThemeProvider>
          <CssBaseline />
          {children}
          <FooterComponent />
        </ThemeProvider>
      </body>
    </html>
  );
}
