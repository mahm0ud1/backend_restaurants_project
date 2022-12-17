import express from "express";
import routes from './routes/index';
import { connectDb } from "./db/index";
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

connectDb().then(async () => {
    app.listen(3001, () => console.log("Listening on http://localhost:3001"));
});