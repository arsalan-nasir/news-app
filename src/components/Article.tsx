import { ILanguage } from "../model";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import EventIcon from "@mui/icons-material/Event";
import moment from "moment";
import LANGS from "../i18n";
import React from "react";

const Article = ({ data, index, query, language }: ILanguage) => {
  const translation = LANGS[language];

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 500, height: 365, m: "0 auto" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={data.urlToImage || require("../images/default-image.png")}
          title={data.title}
        />
        <CardContent sx={{ paddingTop: "0.5rem" }}>
          <Typography
            variant="overline"
            sx={{ display: "flex", alignItems: "center" }}
            style={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            <EventIcon sx={{ fontSize: "medium", mr: ".5rem" }} />
            {data.publishedAt &&
              moment(data.publishedAt).format("YYYY-MM-DD HH:mm")}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: "1.2rem",
              mb: ".5rem",
              mt: ".5rem",
            }}
            style={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ overflow: "hidden", height: "2.5rem" }}
            style={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            {data.summary}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to={`/article/${index}?query=${query}&language=${language}`}>
            <Button
              variant="text"
              size="small"
              endIcon={<EastIcon />}
              sx={{ fontWeight: "600" }}
              style={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
            >
              {translation.READ_MORE}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default React.memo(Article);
