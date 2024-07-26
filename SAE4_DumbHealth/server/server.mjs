"use strict";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import apiKeyMiddleware from './middlewares/ApiKeyMiddleware.mjs';

const app = express();
dotenv.config();

app.use(cors({origin: '*'}));
app.use(express.json());

/**
 * This code sets up a custom middleware to verify the presence of a valid 
 * API key in every incoming request to the API URL of this server.
 */
app.use(`${process.env.API_URL}/*`, async (req, res, next) => await apiKeyMiddleware(req, res, next));

/**
 * This code searches for every microservice specified in the `config.json` file
 * and sets up an HTTP proxy middleware for each one. The middleware redirects
 * all requests to the corresponding service host.
 */
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
config.services.forEach(service => {
  console.log(`Adding a route to service "${service.name}" at address "${service.host}"`);
  app.use(`${process.env.API_URL}/${service.inAppName}/*`, createProxyMiddleware({
    target: service.host,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.API_URL}/${service.inAppName}`]: '',
    },
    onError: (err, _, res) => {
      console.error(`Error while proxying request to ${service.host}:`, err);
      res.status(500).send({ message: 'Internal Server Error - Service is not available' });
    },
  }));
});

export default app.listen(process.env.APP_PORT, () => console.log(`Server running on port ${process.env.APP_PORT}`));