import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';

const CustomGraphQLModule = GraphQLModule.forRoot({
  autoSchemaFile: true,
  sortSchema: true,

  driver: ApolloDriver,

  playground: true,
  introspection: true,
  context: ({ req, res }) => ({ req, res }),
  formatError: (error: GraphQLError) => ({
    message: error.message,
    code: error.extensions.code || 'INTERNAL_SERVER_ERROR',
  }),
});

export default CustomGraphQLModule;
