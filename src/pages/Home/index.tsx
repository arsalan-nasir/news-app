import { useEffect } from "react";
import Article from "../../components/Article";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import useNews from "../../hooks/news";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LANGS from "../../i18n";
import React from "react";

interface Props {
  query: string;
  language: "en" | "ar";
}

const Home: React.FC<Props> = ({
  query,
  language,
}: {
  query: string;
  language: "en" | "ar";
}) => {
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
        </Box>

        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
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

export default React.memo(Home);
