"use strict";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './api/routes/routes.mjs';
import { connectToTestDb } from './tools/mongo.mjs';
import KeyDAO from './api/dao/KeyDAO.mjs';

dotenv.config();

console.log(`ENV : ${process.env.ENV}`);

if(process.env.ENV == 'TEST') {
    // Connect mongoose to a test db.
    await connectToTestDb();
} else {
    // If mongoose throw an error on connection, the server has to stop.
    await mongoose.connect(process.env.MONGODB_URL, { dbName: 'Dumbhealth' });
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = app.listen(process.env.APP_PORT, () => console.log(`Service running on port ${process.env.APP_PORT}`));

/**
 * This code is used to read signals throw when the
 * user pressing CTRL+C (for exemple) and stopping the
 * server properly and the connection to mongodb.
 */
for (let signal of ["SIGTERM", "SIGINT"])
    process.on(signal,  () => {
        console.info(`${signal} signal received.`);
        console.log("Closing http server.");
        server.close(async (err) => {
        console.log("Http server closed.")
        await mongoose.connection.close()
        console.log("MongoDB connection closed.")
            process.exit(err ? 1 : 0)
        });
    });

export default server;
