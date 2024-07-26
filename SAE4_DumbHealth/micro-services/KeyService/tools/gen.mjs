"use strict";
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.join(__dirname, '../.env')});
/**
 * Generate a unique api key with a size defined in .env file using the key 'KEY_SIZE'.
 * 
 * @returns {string}
 */
const genKey = () => {
    return crypto.randomBytes(parseInt(process.env.KEY_SIZE)).toString('hex');
}
export {genKey};