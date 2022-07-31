import { Request, Response } from 'express';
import executeGraphQL from '@src/service/executeGraphql';
import catchAsync from '@src/utils/catchAsync';

const hasuraProxyCall = catchAsync(async (req: Request, res: Response) => {
  const query = req.body.query as string;
  const variables = req.body.variables as Record<string, any>;
  const context = { req };
  const resp = await executeGraphQL({ query, variables, context });
  res.json(resp);
});

export { hasuraProxyCall };
