"use strict";
import express from 'express';
import RecipeController from './api/controllers/RecipeController.mjs';

const router = express.Router();

router
    // /recipes route
    .get('/recipes', async (req, res) => res.status(200).send(await RecipeController.findAll(req.query.page && req.query.page > 0 ? req.query.page : 1)))

    // /recipe routes
    .get('/recipe', async (req, res) => {
        if(req.query.id) {
            const recipe = await RecipeController.findById(req.query.id);
            if(recipe) res.status(200).send(recipe);
            else res.status(404).send('Not Found');
        }
        else res.status(400).send('Bad Request - Id is required');
    })
    .post('/recipe', async (req, res) => {
        
    })
    .delete('/recipe', async (req, res) => {
        
    })
    .patch('/recipe', async (req, res) => {
        
    });

export default router;