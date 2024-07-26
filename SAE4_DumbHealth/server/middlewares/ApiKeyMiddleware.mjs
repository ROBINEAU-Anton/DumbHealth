"use strict";
import axios, { AxiosError } from 'axios';

/**
 * Middleware function to verify the presence and validity of an API key in the request headers.
 *
 * @param {Express.Request} req - The incoming request object.
 * @param {Express.Response} res - The outgoing response object.
 * @param {function} next - The next middleware function in the stack.
 */
export default async function middleware(req, res, next) {
    // Check if the API key is present in the request headers
    if (req.headers["x-api-key"]) {
        try {
            // Make a GET request to the key service to check the validity of the API key
            const key = await axios.get(`${process.env.KEY_SERVICE_HOST}/checkkey?key=${req.headers["x-api-key"]}`, {
                headers: {
                    'X-API-KEY': process.env.DH_ADMIN_API_KEY // Include the admin API key in the request headers
                }
            });

            if (key.status === axios.HttpStatusCode.Ok) {
                // Set the admin property of the request object to the value of the isAdmin property of the response data
                req.headers['admin'] = key.data.isAdmin;
                next();
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                // Bad response from request to Key service
                if(e.response.status === axios.HttpStatusCode.Unauthorized || e.response.status === axios.HttpStatusCode.BadRequest) {
                    res.status(401).send({ message: 'Unauthorized - API Key is invalid' });
                    return;
                }
            }
            res.status(500).send({ message: 'Internal Server Error - We are unable to check the validity of your API Key' });
        }
    } else res.status(401).send({ message: 'Unauthorized - API Key is required' });
}
