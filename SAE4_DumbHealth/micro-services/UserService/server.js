"use strict";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './api/routes/router.mjs';

dotenv.config();

// Make mongoose connect to mongodb
mongoose.connect(process.env.MONGODB_URL, { dbName: 'Dumbhealth' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(router); // Make react use the router created in /api/routes/router.mjs

app.listen(process.env.APP_PORT, () => console.log(`Service running on port ${process.env.APP_PORT}`));