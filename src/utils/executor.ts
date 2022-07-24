import { ASTNode, print } from 'graphql';
import fetch from 'cross-fetch';

// TODO
// check ENABLE_ADMIN_SECRET_AUTHORIZATION is set
// to make request as admin
// else make request as logged in user with jwt claims

interface ExecutorProps {
  document: ASTNode;
  variables: any;
  context?: any;
}

const executor = async ({ document, variables }: ExecutorProps) => {
  const query = print(document);
  const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
};

export default executor;
