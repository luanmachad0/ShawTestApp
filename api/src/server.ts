import {Request, Response } from 'express';
import express from 'express';
import db from './config/database.config';
import { global } from './types/global'
const upload = require("./middleware/upload");
const csvController = require("./controllers/csv.controller");

db.sync().then(() => {
    console.log('connect to db');
});

const app = express();
const port = 3000;

global.__basedir = __dirname + "/..";

app.post("/api/files", upload.single('file'), csvController.upload);
app.get("/api/users", (req: Request, res: Response) => {
    if (req.query.q)
    {
        csvController.getUsers(req.query.q, res)
    } else {
        csvController.getUsers(req, res)
    }
});

app.get('/', (req: Request, res: Response) => {
    return res.send('hello world');
});

app.listen(port, () => {
    console.log("server is running on port " + port);
});