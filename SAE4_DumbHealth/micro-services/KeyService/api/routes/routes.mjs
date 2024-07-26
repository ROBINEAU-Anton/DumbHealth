"use strict";
import express from 'express';
import middleware from '../middlewares/AdminApiKeyMiddleware.mjs';
import KeyController from '../controllers/KeyController.mjs';
import {genKey} from '../../tools/gen.mjs';

const router = express.Router();

// Middleware that check the presence and the validity of the admin api key in each requests
router.use(async (req, res, next) => await middleware(req, res, next));

router
    // Route to check the validity of an api key
    .get('/checkkey', async (req, res) => {
        if(req.query.key) {
            const key = await KeyController.find(req.query.key);
            if(key) res.status(200).send(key);
            else res.status(404).send({ message: 'Not Found - Key not found' });
        } else res.status(400).send({ message: 'Bad Request - Key is required' });
    })

    // Route to generate an api key
    .get('/genkey', async (_, res) => {
        const key = await KeyController.add(genKey());
        if(key) res.status(201).send(key);
        else res.status(500).send({ message: 'Internal Server Error - We are unable to create your API Key' });
    });

export default router;