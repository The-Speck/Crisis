import { ConfigException } from '../errors';

/*************************************************************************************
 * The export in this file is structured in a specific way to satisify typescipt     *
 * while maintaining dynamic loading for different environments. As more config      *
 * options are added, we must expand the interface and object deconstructor below.   *
 *************************************************************************************/

export interface ConfigOptions {
  TOP_NEWS_API_URL: string;
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

export const { TOP_NEWS_API_URL } = configOptions;
