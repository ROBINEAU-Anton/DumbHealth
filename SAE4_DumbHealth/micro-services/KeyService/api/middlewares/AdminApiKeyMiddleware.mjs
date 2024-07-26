"use strict";
import KeyController from '../controllers/KeyController.mjs';

/**
 * Middleware used to identify and accept only incoming requests with an
 * admin API Key provided.
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next 
 */
export default async function middleware(req, res, next) {
    if(req.headers['x-api-key']) {
        const key = await KeyController.find(req.headers['x-api-key']);
        if(key.isAdmin) next();
        else res.status(401).send({ message: 'Unauthorized - Admin API Key is invalid' });
    } else res.status(400).send({ message: 'Bad Request - Admin API Key is required' });
}