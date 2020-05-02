import { ConfigException } from '../errors';

/**
 * This file is structured in a specific way to satisify typescipt while maintaining
 * dynamic loading for different environments. As more config options are added,
 * we must expand the interface and object deconstructor below.
 */

export interface ConfigOptions {
  NEWS_API_URL: string;
  SERVER_URL: string;
}

let configOptions: ConfigOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    configOptions = require('./development');
    break;
  case 'production':
    configOptions = require('./production');
    break;
  default:
    throw new ConfigException(`Invalid Url Environment ${process.env.NODE_ENV}`);
}

export const { NEWS_API_URL, SERVER_URL } = configOptions;
