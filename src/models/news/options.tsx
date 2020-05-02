export interface TopNewsOptions {
  sources?: string;
  q?: string;
  category?: string;
  language?: string;
  country?: string;
}

export interface EverythingNewsOptions {
  q: string;
  sources: string;
  domains: string;
  from: string;
  to: string;
  language: string;
  sortBy: string;
  page: number;
}

export interface SourceOptions {
  category: string;
  language: string;
  country: string;
}
