"use strict";
import axios, { AxiosError } from "axios";

/**
 * Performs a GET request using axios with exception handling and handles the response status and content.
 * If `res` is provided, it sends the response status and data. If not, it returns the data or null in case of an exception.
 *
 * @param {string} url - URL to perform the GET request.
 * @param {Express.Request} res - Optional: Response object to send data.
 * @param {axios.AxiosRequestConfig} config - Optional: Add request options
 * @returns {object|null}
 */
const get = async (url, res = null, config = null) => {
    try {
        console.log(url);
        // Retrieve data from API
        const response = await axios.get(url, config);

        if (res) res.status(200).send(response.data);
        else return response.data;
    } catch (e) {
        if(process.env.ENV == 'DEV') console.error(e);
        if(!res) return null;
        if(e instanceof AxiosError) res.status(e.response.status).send(e.response.status == 500 ? {message: 'Internal Server Error'} : e.response.data);
    }
};

export { get }
