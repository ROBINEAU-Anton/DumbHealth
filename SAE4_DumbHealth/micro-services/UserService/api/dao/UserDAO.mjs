"use strict";
import mongoose from "mongoose";
import User from "../models/User.mjs";
import UserController from "../controllers/UserController.mjs";

const schema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    created_at: {type: Date, required: true},
});

const Model = mongoose.model('users', schema);

const maxPerPage = 5;

export default {
    /**
     * Retrieve all users from the database.
     * 
     * @returns {Promise<User[]>} An array of all users found.
     */
    findAll: async (page) => (await Model.find({}, {}, {
        skip: maxPerPage*(page-1),
        limit: maxPerPage,
    })).map(u => (new User(u)).getWithoutPassword()),

    /**
     * Find a user by its ID.
     * 
     * @param {string} id - The ID of the user to find.
     * @returns {Promise<User|null>} The found user or null if no matching user is found.
     */
    findById: async (id) => {
        const user = await Model.findById(id);
        return user ? (new User(user)).getWithoutPassword() : null;
    },

    /**
     * Find a user by its email.
     * 
     * @param {string} email - The email of the user to find.
     * @returns {Promise<User|null>} The found user of null if no matching user is found.
     */
    findByEmail: async (email) => {
        const find = await Model.findOne({ email: email });
        return find ? (new User(find)).getWithoutPassword() : null;
    },

    /**
     * Add a new user to the database.
     * 
     * @param {User} user - The User object to add.
     * @returns {Promise<User|null>} The newly added user with its generated ID.
     */
    add: async (user) => {
        user.created_at = new Date(Date.now());
        const newUser = new Model(user);
        if(await UserController.findByEmail(newUser.email)) return null;
        return (new User(await newUser.save())).getWithoutPassword();
    },

    /**
     * Remove a user from the database by its ID.
     * 
     * @param {string} id - The ID of the user to remove.
     * @returns {Promise<boolean>} - True if deleted false if not
     */
    remove: async (id) => await Model.findByIdAndDelete(id) ? true : false,

    /**
     * Update an existing user in the database.
     * 
     * @param {User} user - The User object containing updated information.
     * @returns {Promise<User|null>} The updated user or null if the user with the given ID does not exist.
     */
    update: async (user) => {
        const updated = await Model.findByIdAndUpdate(user);
        return updated ? (new User(updated)).getWithoutPassword() : null;
    },

    /**
     * Get the pages number
     * 
     * @returns {Promise<number>} The number of pages
     */
    getPages: async () => Math.ceil(await Model.countDocuments({})/maxPerPage),
}
