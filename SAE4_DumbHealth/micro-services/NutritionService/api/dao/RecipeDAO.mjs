"use strict";
import mongoose from "mongoose";
import Recipe from "../models/Recipe.mjs";

const schema = new mongoose.Schema({
    name: {type: String, required: true},
});

const Model = mongoose.model('recipes', schema);

const maxPerPage = 1;

export default {
    /**
     * Retrieve all recipes from the database.
     * 
     * @returns {Promise<Recipe[]>} An array of all recipes found.
     */
    findAll: async (page) => (await Model.find({}, {}, {
        skip: maxPerPage*(page-1),
        limit: maxPerPage,
    })),
    /**
     * Find a recipe by its ID.
     * 
     * @param {string} id - The ID of the recipe to find.
     * @returns {Promise<Recipe|null>} The found recipe or null if no matching recipe is found.
     */
    findById: async (id) => new Recipe(await Model.findById(id)),

    /**
     * Add a new recipe to the database.
     * 
     * @param {Recipe} recipe - The Recipe object to add.
     * @returns {Promise<Recipe|null>} The newly added recipe with its generated ID.
     */
    add: async (recipe) => {
        const newRecipe = new Model(recipe);
        if(!newRecipe.isNew()) return null;
        return new Recipe(await newRecipe.save());
    },

    /**
     * Remove a recipe from the database by its ID.
     * 
     * @param {string} id - The ID of the recipe to remove.
     * @returns {Promise<void>}
     */
    remove: async (id) => await Model.findByIdAndDelete(id) ? true : false,

    /**
     * Update an existing recipe in the database.
     * 
     * @param {Recipe} recipe - The Recipe object containing updated information.
     * @returns {Promise<Recipe|null>} The updated recipe or null if the recipe with the given ID does not exist.
     */
    update: async (recipe) => new Recipe(await Model.findByIdAndUpdate(recipe)),
}
