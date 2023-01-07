import express from "express";
import routes from './routes/index';
import { connectDb } from "./db/index";
import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser')
import cors from 'cors';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(routes);

connectDb().then(async () => {
    app.listen(3001, () => console.log("Listening on http://localhost:3001"));
});