import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticleDetail";
import { ThemeProvider } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";
import {
  AppBar,
  PaletteMode,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import _debounce from "lodash/debounce";
import LANGS from "./i18n";

function App() {
  const [query, setQuery] = useState<any>("");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const translation = LANGS[language];

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
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {translation.APP_NAME}
            </Typography>

            <TextField
              type="search"
              placeholder={translation.SEARCH_PLACEHOLDER}
              onChange={_debounce(
                (event) => setQuery(event.target.value),
                1000
              )}
              sx={{
                my: "1rem",
                maxWidth: "30rem",
              }}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <Select
                sx={{
                  my: "1rem",
                  maxWidth: "30rem",
                }}
                fullWidth
                size="small"
                value={language}
                label="Language"
                onChange={(e: any) => setLanguage(e.target.value)}
                style={{
                  backgroundColor: "background.default",
                  color: "text.primary",
                }}
                inputProps={{
                  classes: {
                    root: "background.default",
                    icon: "text.primary",
                  },
                }}
              >
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"ar"}>{translation.ARABIC} </MenuItem>
              </Select>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={<Home query={query} language={language} />}
          />
          <Route
            path="/article/:id"
            element={<ArticlePage query={query} language={language} />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
