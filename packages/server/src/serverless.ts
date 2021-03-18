import serverless from 'serverless-http';
import app from './app';

export const handler = async (
  event: AWSLambda.APIGatewayProxyEvent | AWSLambda.APIGatewayProxyEventV2,
  context: AWSLambda.Context
) => {
  return await serverless(app)(event, context);
};
