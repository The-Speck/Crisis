import { ConfigException } from '../errors';

/*************************************************************************************
 * The export in this file is structured in a specific way to satisify typescipt     *
 * while maintaining dynamic loading for different environments. As more config      *
 * options are added, we must expand the interface and object deconstructor below.   *
 *************************************************************************************/

export interface ConfigOptions {
  TOP_NEWS_API_URL: string;
  AUTH_API_URL: string;
  SIGNUP_API_URL: string;
  LOGIN_API_URL: string;
  AUTH_REFRESH_API_URL: string;
  LOGOUT_API_URL: string;
  GET_USER_URL: string;
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

export const {
  TOP_NEWS_API_URL,
  AUTH_API_URL,
  SIGNUP_API_URL,
  LOGIN_API_URL,
  AUTH_REFRESH_API_URL,
  LOGOUT_API_URL,
  GET_USER_URL,
} = configOptions;
