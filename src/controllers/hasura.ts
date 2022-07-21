import fetch from 'cross-fetch';
import { Request, Response } from 'express';

// TODO: substitute secret key with environment variable

async function executeGraphQL(query: string, variables: Record<string, any>) {
  const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
  });

  const data = await response.json();
  return data;
}

const hasuraProxyCall = async (req: Request, res: Response) => {
  const query = req.body.query as string;
  const variables = req.body.variables as Record<string, any>;

  const response = await executeGraphQL(query, variables);
  res.json(response);
};

export { executeGraphQL, hasuraProxyCall };
