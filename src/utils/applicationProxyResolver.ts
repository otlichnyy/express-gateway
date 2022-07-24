import { delegateToSchema } from '@graphql-tools/delegate';

interface ApplicationProxyResolverProps {
  subschemaConfig: any;
  operation: any;
  transformedSchema: any;
}

const applicationProxyResolver =
  ({
    subschemaConfig,
    operation,
    transformedSchema,
  }: ApplicationProxyResolverProps) =>
  (_parent: any, _args: any, context: any, info: any) =>
    delegateToSchema({
      schema: subschemaConfig,
      operation,
      operationName: info?.operation?.name?.value,
      context,
      info,
      transformedSchema,
    });

export default applicationProxyResolver;
