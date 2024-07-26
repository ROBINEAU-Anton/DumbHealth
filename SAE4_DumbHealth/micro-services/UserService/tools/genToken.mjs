"use strict";
import crypto from 'crypto';
const genToken = () => crypto.randomBytes(32).toString('hex');
export {genToken};