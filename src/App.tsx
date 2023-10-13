import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticleDetail";
import { ThemeProvider } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";
import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { useMemo, useState } from "react";

function App() {
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
