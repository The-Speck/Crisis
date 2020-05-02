export const fetchTopNewsHeadlines = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
  });

export const fetchEveryNews = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
  });
