import dotenv from 'dotenv';
import app from './app';
import Database from './database';

dotenv.config();

const database = new Database();

database.getConnection().then(() => {
  app.listen(4000);
});
