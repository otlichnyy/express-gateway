import { wrapSchema, introspectSchema } from '@graphql-tools/wrap';
import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import applicationProxyResolver from './applicationProxyResolver';
import catchAsync from './catchAsync';
import executor from './executor';

const graphqlProxyServer = catchAsync(async (req: Request, res: Response) => {
  const schema = wrapSchema({
    // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-unsafe-argument
    schema: await introspectSchema(executor as any),
    executor: executor as any,
    createProxyingResolver: applicationProxyResolver as any,
  });
  await graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      req,
    },
  })(req, res);
});

export default graphqlProxyServer;
