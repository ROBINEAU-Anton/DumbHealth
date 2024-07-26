"use strict";
/**
 * This middleware is used to check if a passed request contains an admin value, if true
 * then by using the next function, continue the process. If admin value is false, then
 * respond with a status 403 (Unauthorized). If admin is not present inside the request,
 * then respond with a status 400 (Bad Request).
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next 
 */
export default function middleware(req, res, next) {
    if(req.headers['admin'] === 'true') next();
    else if(req.headers['admin'] === 'false') res.status(401).send({ message: 'Unauthorized - Your API key does not allow this request to be made.' });
    else res.status(400).send({ message: 'Bad Request - We are unable to verify your API key rights.' });
}
