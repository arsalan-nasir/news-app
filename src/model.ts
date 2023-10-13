export interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ILanguage {
  language: "en" | "ar";
  data: any;
  index: any;
  query: any;
}
