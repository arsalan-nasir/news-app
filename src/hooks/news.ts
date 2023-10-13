import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IArticle } from "../model";
import moment from "moment";

const useNews = (query: string, selectedLanguage: string | null) => {
  const [news, setNews] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, [query, selectedLanguage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchNews() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get(
        "https://newsapi.org/v2/everything?apiKey=05df11028d1c4d819365490db87fa08d&" +
          `${query ? `q=${query}&` : "q=apple&"}` + // The API is returning error without q param that's why on default I'm using apple
          `from=${moment().subtract(7, "d").format("YYYY-MM-DD")}&` +
          "sortBy=publishedAt&" +
          `language=${selectedLanguage}`
      );
      setNews(response.data.articles);

      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      setError((e as AxiosError).message);
    }
  }

  return { news, loading, error };
};

export default useNews;
