"use strict";
import RecipeDAO from "../dao/RecipeDAO.mjs";

// Controller for managing recipe operations
export default {
    findAll: async (page) => await RecipeDAO.findAll(page),
    findById: async (id) => await RecipeDAO.findById(id),
    add: async (recipe) => await RecipeDAO.add(recipe),
    remove: async (id) => await RecipeDAO.remove(id),
    update: async (recipe) => await RecipeDAO.update(recipe),
}