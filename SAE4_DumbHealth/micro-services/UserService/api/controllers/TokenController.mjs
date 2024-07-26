"use strict";
import TokenDAO from "../dao/TokenDAO.mjs";

// Controller for managing token operations
export default {
    find: async (token) => await TokenDAO.find(token),
    add: async (token, userId) => await TokenDAO.add(token, userId),
    remove: async (id) => await TokenDAO.remove(id),
    update: async(token, userId) => await TokenDAO.update(token, userId),
}