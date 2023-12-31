import { useParams, useNavigate } from "react-router";

import useNews from "../../hooks/news";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { Button, Box, Typography, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import React from "react";

type ArticlePageParams = {
  id: string;
};

interface Props {
  query: string;
  language: "en" | "ar";
}

const ArticlePage: React.FC<Props> = ({
  query,
  language,
}: {
  query: string;
  language: "en" | "ar";
}) => {
  const { error, news, loading } = useNews(query || "", language);
  const { id } = useParams<ArticlePageParams>();
  const index = id;
  const articleData = news.find((item) => item.title === index);
  const navigate = useNavigate();

  useEffect(() => {
    if (!articleData) {
      navigate("/");
    }
  }, [articleData]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box
            component="img"
            sx={{
              height: 500,
              width: "100%",
              maxHeight: { xs: 200, sm: 300, md: 400 },
            }}
            alt={articleData?.title}
            src={articleData?.urlToImage}
          />
          <Box
            sx={{
              margin: { md: "4rem", xs: "1rem" },
              position: "absolute",
              top: { xs: 130, sm: 200, md: 250 },

              p: { md: "2rem 4rem", xs: "1rem 1.5rem" },
              width: { sm: "90%", md: "80%" },
              borderRadius: "10px",
            }}
            style={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: "3rem",
                fontSize: { xs: "1.5rem" },
              }}
              style={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
            >
              {articleData?.title}
            </Typography>
            <Typography
              variant="body1"
              style={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
            >
              {articleData?.description}
            </Typography>
            <Typography
              style={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
              variant="subtitle1"
              sx={{ marginTop: "1rem", fontWeight: "600" }}
            >
              Learn more:
              <Link href={articleData?.url} underline="hover" color="inherit">
                {articleData?.title}
              </Link>
            </Typography>

            <Button
              onClick={() => navigate("/")}
              startIcon={<ArrowBackIcon />}
              sx={{ marginTop: "3rem" }}
              style={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
            >
              Back to homepage
            </Button>
          </Box>
        </>
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default React.memo(ArticlePage);
