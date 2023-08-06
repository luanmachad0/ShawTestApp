import {Request, Response } from 'express';
import express from 'express';
import db from './config/database.config';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance } from './model';

db.sync().then(() => {
    console.log('connect to db');
});

const app = express();
const port = 3000;

app.post('/api/files', async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
        const record = await UserInstance.create({ ...req.body, id });
        return res.json({ record, msg: 'Successsfully created user'});
    } catch (e) {
        return res.json({ msg: 'fail to create', status: 500, route: '/api/files' });
    }
})

app.get('/', (req: Request, res: Response) => {
    return res.send('hello world');
});

app.listen(port, () => {
    console.log("server is running on port " + port);
});