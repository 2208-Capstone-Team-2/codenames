import express, { Express, Request, Response } from "express";
import cors from 'cors';
import path from "path";
import apiRouter from "./api";
import morgan from "morgan";
const app: Express = express();
// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
// body parsers!!!! woohoooo!!!!!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("tiny"));

app.use('/api', apiRouter);

app.use('*', (req: Request, res:Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
