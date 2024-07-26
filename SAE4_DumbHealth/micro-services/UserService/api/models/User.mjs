    "use strict";
export default class User {
    constructor(obj) {
        // Verify the object provided to check if every parameters needed are present.
        if (!User._isValid(obj))
            throw new Error('Invalid user');

        this._id = obj.id;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.email = obj.email;
        this.password = obj.password;
        this.created_at = obj.created_at;
    }

    getWithoutPassword() {
        return {
            _id: this._id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            created_at: this.created_at,
        }
    }

    /**
     * Verify if an object is a valid user.
     * 
     * @param {Object} obj - Validate the object content.
     * @returns True if it's valid or false if not.
     */
    static _isValid(obj) {
        if (
            !obj ||
            !obj.firstname ||
            !obj.lastname ||
            !obj.email ||
            !obj.password
          ) {
            return false;
          }
          return true;
    }
}