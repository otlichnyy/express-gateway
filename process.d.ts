declare namespace NodeJS {
  export interface ProcessEnv {
    ST_CORE_URI: string;
    ST_CORE_API_KEY: string;
    APP_URL: string;
    API_URL: string;
    HASURA_GRAPHQL_URL: string;
    HASURA_ADMIN_SECRET: string;
  }
}
