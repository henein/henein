import serverless from 'serverless-http';
import app from './app';
import Database from './database';

export const handler = async (
  event: AWSLambda.APIGatewayProxyEvent | AWSLambda.APIGatewayProxyEventV2,
  context: AWSLambda.Context
) => {
  const database = new Database();
  const connection = await database.getConnection();
  const response = await serverless(app)(event, context);

  try {
    await connection.close();
  } catch (error) {}

  return response;
};
