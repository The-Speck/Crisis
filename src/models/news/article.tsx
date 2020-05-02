export interface Article {
  source: ArticleSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface ArticleSource {
  id: string;
  name: string;
}

export interface ArticleSourceDetail extends ArticleSource {
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
