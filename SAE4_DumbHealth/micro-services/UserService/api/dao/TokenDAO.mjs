"use strict";
import mongoose from "mongoose";
import Token from '../models/Token.mjs';
import TokenController from '../controllers/TokenController.mjs';

const schema = new mongoose.Schema({
    token: {type: String, required: true},
    userId: {type: String, required: true},
    created_at: {type: Date, required: true},
    expired_at: {type: Date, required: true},
});

const Model = mongoose.model('session_tokens', schema);

export default {
    /**
     * Find a token by its ID.
     * 
     * @param {string} id - The ID of the token to find.
     * @returns {Promise<Token|null>} The found token or null if no matching token is found.
     */
    findById: async (id) => new Token(await Model.findById(id)),

    /**
     * Find a token by its value
     * 
     * @param {string} token - The value of the token to find.
     * @returns {Promise<>Token|null>} The found token or null if no matching token is found.
     */
    find: async (token) => {
        const find = await Model.findOne({ token: token });
        return find ? new Token(find) : null;
    },

    /**
     * Add a new token to the database.
     * 
     * @param {string} token - The token value to add.
     * @returns {Promise<Token|null>} The newly added token with its generated ID.
     */
    add: async (token, userId) => {
        if(await TokenController.find(newToken.token) != null) return await TokenController.update(token, userId);

        const created_at = new Date(Date.now());
        const expired_at = new Date(Date.now());
        expired_at.setFullYear(created_at.getHours()+1);

        const newToken = new Model({
            token: token,
            userId: userId,
            created_at: created_at,
            expired_at: expired_at,
        });

        return new Token(await newToken.save());
    },

    /**
     * Remove a token from the database by its ID.
     * 
     * @param {string} id - The ID of the token to remove.
     * @returns {Promise<boolean>} - True if deleted false if not
     */
    remove: async (id) => await Model.findByIdAndDelete(id) ? true : false,

    /**
     * Update a token
     * 
     * @param {string} token - The new token
     * @param {string} userId - The user's id
     * @returns {Promise<Token|null>}
     */
    update: async (token, userId) => {
        await Model.updateOne({ userId: userId }, { token: token });
        return await TokenController.find(token);
    },
}
