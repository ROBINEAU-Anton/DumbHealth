"use strict";
import UserDAO from "../dao/UserDAO.mjs";

// Controller for managing user operations
export default {
    findAll: async (page) => await UserDAO.findAll(page),
    findById: async (id) => await UserDAO.findById(id),
    findByEmail: async (email) => await UserDAO.findByEmail(email),
    add: async (user) => await UserDAO.add(user),
    remove: async (id) => await UserDAO.remove(id),
    update: async (user) => await UserDAO.update(user),
    getPages: async () => await UserDAO.getPages(),
}