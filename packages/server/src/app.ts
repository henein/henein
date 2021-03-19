import 'reflect-metadata';
import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import router from './routes';

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(bodyParser());

app.use(passport.initialize());

app.use(router.routes());

export default app;

// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
