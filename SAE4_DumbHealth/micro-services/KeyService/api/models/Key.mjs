"use strict";
export default class Key {
    constructor(obj) {
        if (!Key._isValid(obj))
            throw new TypeError('Invalid key object');

        this._id = obj._id;
        this.key = obj.key;
        this.isAdmin = obj.isAdmin;
        this.created_at = obj.created_at;
        this.expired_at = obj.expired_at;
    }

    /**
     * Verify if an object is a valid user
     * 
     * @param {Object} obj - Validate the object content.
     * @returns {boolean} True if it's valid or false if not.
     */
    static _isValid(obj) {
        if (
            !obj ||
            !obj._id ||
            !obj.key ||
            (obj.isAdmin != true && obj.isAdmin != false) ||
            !obj.created_at ||
            !obj.expired_at
          ) {
            return false;
          }
          return true;
    }
}