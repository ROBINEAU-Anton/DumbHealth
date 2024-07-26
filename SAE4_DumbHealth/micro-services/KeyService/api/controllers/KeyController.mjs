"use strict";
import KeyDAO from "../dao/KeyDAO.mjs";

// Controller for managing key operations
export default {
    find: async (key) => await KeyDAO.find(key),
    add: async (key) => await KeyDAO.add(key),
    remove: async (id) => await KeyDAO.remove(id),
}