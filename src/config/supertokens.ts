import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import { TypeInput } from 'supertokens-node/lib/build/types';

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

export const appDomain = isProduction
  ? process.env.APP_URL
  : `http://localhost:3000`;

export const apiDomain = isProduction
  ? process.env.API_URL
  : `http://localhost:4001`;

const appInfo = {
  appName: 'SuperTokens Demo App',
  websiteDomain: appDomain,
  apiDomain,
  apiBasePath: '/auth/',
  websiteBasePath: '/auth',
};

const backendConfig = (): TypeInput => ({
  framework: 'express',
  supertokens: {
    connectionURI: process.env.ST_CORE_URI,
    apiKey: process.env.ST_CORE_API_KEY,
  },
  appInfo,
  recipeList: [EmailPasswordNode.init(), SessionNode.init()],
  isInServerlessEnv: true,
});

export default backendConfig;
