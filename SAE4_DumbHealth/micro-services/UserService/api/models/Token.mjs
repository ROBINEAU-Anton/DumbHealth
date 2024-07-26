"use strict";
import { isValidObjectId } from 'mongoose';
export default class Token {
    constructor(obj) {
        if (!Token._isValid(obj))
            throw new Error('Invalid key');

        this._id = obj.id;
        this.token = obj.key;
        this.userId = obj.userId;
        this.created_at = obj.created_at;
        this.expired_at = obj.expired_at;
    }

    /**
     * Verify if an object is a valid token object
     * 
     * @param {Object} obj - Validate the object content.
     * @returns True if it's valid or false if not.
     */
    static _isValid(obj) {
        if (
            !obj ||
            !obj._id ||
            !obj.token ||
            !(obj.userId && isValidObjectId(obj.userId)) ||
            !obj.created_at ||
            !obj.expired_at
          ) {
            return false;
          }
          return true;
    }
}