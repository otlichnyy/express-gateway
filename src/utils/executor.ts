import { ASTNode, print } from 'graphql';
import fetch from 'cross-fetch';
import { SessionRequest } from 'supertokens-node/lib/build/recipe/session/types';
import jwt from 'jsonwebtoken';

interface ExecutorProps {
  document: ASTNode;
  variables: any;
  context?: { req: SessionRequest };
}

export const jwtClaims = (userId: string, exp?: Date) => ({
  sub: userId,
  iat: Date.now() / 1000,
  exp: exp || Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-default-role': 'user',
    'x-hasura-role': 'user',
    'x-hasura-user-id': userId,
  },
});

const executor = async ({ document, variables, context }: ExecutorProps) => {
  let headers: any;

  if (context?.req.session !== undefined) {
    // session exists
    // sign token
    const userId = context.req.session.getUserId();
    const token = jwt.sign(jwtClaims(userId), process.env.HASURA_JWT_SECRET, {
      algorithm: 'HS256',
    });
    // create authroization header
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    // session doesn't exist
    headers = {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    };
  }
  const query = print(document);
  const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
};

export default executor;
