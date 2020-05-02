import { TopNewsOptions } from '../models/news';

export const createNewsQuery = (options: TopNewsOptions): string => {
  return (Object.keys(options) as [keyof TopNewsOptions])
    .map((optionName) => `${optionName}=${options[optionName]}`)
    .join('&');
};
