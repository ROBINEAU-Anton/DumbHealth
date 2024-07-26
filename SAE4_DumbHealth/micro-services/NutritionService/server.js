"use strict";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './api/routes/router.mjs';

const app = express();
dotenv.config();

// Make mongoose connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {dbName: 'Dumbhealth'});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => console.log(`Service running on port ${process.env.PORT}`));
