"use strict";
import mongoose from "mongoose";
import Key from "../models/Key.mjs";
import KeyController from "../controllers/KeyController.mjs";

const schema = new mongoose.Schema({
    key: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    created_at: { type: Date, required: true },
    expired_at: { type: Date, required: true },
});

const Model = mongoose.model('keys', schema);

export default {
    /**
     * Find a key by its ID.
     * 
     * @param {string} id - The ID of the key to find.
     * @returns {Promise<Key|null>} The found key or null if no matching key is found.
     */
    findById: async (id) => {
        if(!mongoose.isValidObjectId(id)) return null;
        const find = await Model.findById(id);
        return find ? new Key(find) : null;
    },

    /**
     * Find a key by its value
     * 
     * @param {string} key - The value of the key to find.
     * @returns {Promise<>Key|null>} The found key or null if no matching key is found.
     */
    find: async (key) => {
        if(!key) return null;
        const find = await Model.findOne({ key: key });
        return find ? new Key(find) : null;
    },

    /**
     * Add a new key to the database.
     * 
     * @param {string} key - The key value to add.
     * @param {boolean} isAdmin - Is the key an admin key.
     * @returns {Promise<Key|null>} The newly added key with its generated ID.
     */
    add: async (key, isAdmin = false) => {
        if(key.trim() == '') return null;
        const created_at = new Date(Date.now());
        const expired_at = new Date(Date.now());
        expired_at.setFullYear(created_at.getFullYear() + 1);

        const newKey = new Model({
            key: key,
            isAdmin: isAdmin,
            created_at: created_at,
            expired_at: expired_at,
        });

        if (await KeyController.find(newKey.key)) return null;
        return new Key(await newKey.save());
    },

    /**
     * Remove a key from the database by its ID.
     * 
     * @param {string} id - The ID of the key to remove.
     * @returns {Promise<boolean>} - True if deleted false if not
     */
    remove: async (id) => {
        if(!mongoose.isValidObjectId(id)) return false;
        return await Model.findByIdAndDelete(id) ? true : false
    },

    /**
     * Remove all keys in the database.
     * 
     * @returns {Promise<void>}
     */
    removeAll: async () => { await Model.deleteMany({}) },
}
