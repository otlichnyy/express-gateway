import { SessionRequest } from 'supertokens-node/framework/express';
import { signJwt } from '@src/utils/signJwt';
import { fetchHasura } from '@src/utils/fetchHasura';

interface executeProps {
  query: string;
  variables: Record<string, any>;
  context?: { req: SessionRequest };
}

const executeGraphQL = async ({ query, variables, context }: executeProps) => {
  // get userId from session, it'll always be there, coz session is requried
  const userId = context?.req.session?.getUserId() as string;

  // sign jwt with HS256
  const token = signJwt(userId);

  // send jwt to hasura using fetch
  const response = await fetchHasura(token, query, variables);

  return response;
};

export default executeGraphQL;
