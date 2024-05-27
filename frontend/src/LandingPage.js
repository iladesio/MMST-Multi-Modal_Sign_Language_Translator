import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";

export default function LandingPage() {
  const [mode, setMode] = React.useState("light"); // Gestisce solo il cambio del mode da chiaro a scuro

  // Crea il tema di default di Material-UI con una modalità impostata
  const defaultTheme = createTheme({
    palette: {
      mode: mode, // Puoi impostare qui "light" o "dark" per il tema di default
      // Altri parametri di stile possono essere aggiunti qui per personalizzare ulteriormente il tema
    },
  });

  // Funzione per cambiare la modalità del tema da chiaro a scuro
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Divider />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Divider />
      </Box>
    </ThemeProvider>
  );
}
