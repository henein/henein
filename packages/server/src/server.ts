import app from './app';
import Database from './database';

const database = new Database();

database.getConnection().then(() => {
  app.listen(4000);
});
