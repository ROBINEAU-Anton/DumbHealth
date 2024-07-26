"use strict"
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { get } from './tools/requests.mjs';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/exercises', (req, res) => get(process.env.API_URL+(Object.keys(req.query).length > 0 ? '?'+Object.entries(req.query).map(v => v.join('=')).join('&') : ''), res, { headers: { 'X-Api-Key': process.env.API_KEY } }));

app.listen(process.env.APP_PORT, () => console.log(`Service running on port ${process.env.APP_PORT}`));
