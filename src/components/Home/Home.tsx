import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import useNews from "../../hooks/news";
import { Article } from "./Article";
import Error from "./Error";
import Loading from "./Loading";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LANGS from "../../i18n";

export const Home: React.FC = () => {
  const [query, setQuery] = useState<any>("");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const { error, news, loading } = useNews(query, language);
  const translation = LANGS[language];

  useEffect(() => {
    if (language === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [language]);

  return (
    <>
      <Container sx={{ padding: { xs: "2rem", md: "2rem" } }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            {translation.FILTER_TITLE}
          </Typography>

          <TextField
            type="search"
            placeholder={translation.SEARCH_PLACEHOLDER}
            onChange={_debounce((event) => setQuery(event.target.value), 1000)}
            // variant="outlined"
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
        </Box>
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
        {loading ? (
          <Loading />
        ) : (
          <>
            {error && <Error error={error} />}

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "600" }}
              style={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
            >
              {translation.RESULTS}: {news?.length}
            </Typography>

            <Grid container spacing={3} my={1}>
              {news?.map((item) => (
                <Article
                  key={item.url}
                  data={item}
                  index={item.title}
                  query={query}
                  language={language}
                />
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};
