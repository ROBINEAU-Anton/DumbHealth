"use strict";
import express from 'express';
import bcrypt from 'bcrypt';
import UserController from '../controllers/UserController.mjs';
import User from '../models/User.mjs';
import TokenController from '../controllers/TokenController.mjs';
import checkAdminMiddleware from '../middleware/CheckAdminMiddleware.mjs';
import { genToken } from '../../tools/genToken.mjs';

const saltRounds = 10;
const router = express.Router();

router.use(checkAdminMiddleware);

// /users route
router
    /**
     * Find all users with a pagination system
     */
    .get('/users', async (req, res) => {
        const page = Math.max(1, parseInt(req.query.page || 1));
        
        if(Number.isNaN(page)) {
            // Provided page number is not a valid number
            res.status(400).send({ message: `"${req.query.page}" is not a valid page number.` });
            return;
        }

        // Send actual page, total pages and users at page needed
        res.status(200).send({
            page: page,
            maxPage: await UserController.getPages(),
            data: await UserController.findAll(page),
        });
    });

// /user route
router
    .route('/user')

    .get(async (req, res) => {
        // Get a user by email
        if (req.query.email) {
            const user = await UserController.findByEmail(req.query.email);
            if (user) res.status(200).send(user);
            else res.status(404).send({ message: 'Not Found' });
        }
        else res.status(400).send('Bad Request - Email is required');
    })

    .post(async (req, res) => {
        // Add a user
        if(User._isValid(req.body)) {
            // req.body object has all information needed to create a user
            const added = await UserController.add(req.body);
            if(added) res.status(200).send(added);
            else res.status(400).send({ message: 'User not added' });
        } else res.status(400).send({ message: 'Bad Request - Not a valid user' });
    })

    .delete(async (req, res) => {
        // Delete a user
        if (req.query.id) {
            const isDeleted = await UserController.remove(req.query.id);
            if (isDeleted) res.status(200).send({ message: 'User deleted' });
            else res.status(404).send({ message: 'Not Found' });
        }
        else res.status(400).send('Bad Request - Id is required');
    })

    .patch(async (req, res) => {
        // Update a user's information
        if(req.body.id) {
            // User._isValid(req.body) does not verify the presence of an id, in this case, there is an id
            if(User._isValid(req.body)) {
                // req.body object has all information needed to update a user
                const updated = await UserController.update(req.body);
                if(updated) res.status(200).send(updated);
                else res.status(400).send({ message: 'User has not been updated' });
            } else res.status(400).send({ message: 'Bad Request - Not a valid user' });
        } else res.status(400).send({ message: 'Bad Request - User id is missing' });
    });

// /auth route
router
    .route('/auth')
    /**
     * Retrieve the user
     */
    .get(async (_, res) => {
        res.status(501).send({  message: 'Not Implemented Yet' })
    })
    /**
     * This function will create a user by retrieving of the new user object containing email, password, ...
     * in plain text (using HTTPS), then create the user and hash the password in the same time.
     * If the user is created, send the user and the token, else internal server error.
     */
    .post(async (req, res) => {
        if (!User._isValid(req.body)) {
            return res.status(400).send({ message: 'Bad Request -Invalid user object' });
        }
    
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hashedPass;
            const user = await UserController.add(req.body);
            const token = await TokenController.add(genToken(), user._id);
    
            if (!token) {
                return res.status(500).send({ message: 'Internal Server Error - Failed to create the token' });
            }
    
            res.status(201).send({ token: token, user: user.getWithoutPassword() });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error - Failed to create the user' });
        }
    })
    .delete(async (req, res) => {

    });

// Session token routes
router
    /**
     * Check the validity of a token, if the token is expired, update the expired token. 
     * If the token is valid, send the user and the active token.
     */
    .get('/checktoken', async (req, res) => {
        if(req.query.token) {
            var token = await TokenController.find(req.query.token);
            if(token) {
                if(new Date(Date.now()) > token.expired_date) {
                    // Token is expired
                    token = await TokenController.update(genToken(), token.userId);
                }
                const user = await UserController.findById(token.userId);
                if(user) res.status(200).send({ token: token, user: user.getWithoutPassword() });
                else res.status(404).send({ message: 'Not Found - The user related to the provided token does not exists' })
            }
            else res.status(404).send({ message: 'Not Found - Token not found' });
        } else res.status(400).send({ message: 'Bad Request - Token is required' });
    })

    /**
     * Generate a token by passing a userId and then a token related
     * to the userId will be created. By using the TokenController.add 
     * method, if the token already exists, it will be replaced by a new one. 
     * If created, send the token, if not it's a problem from the server.
     */
    .get('/gentoken', async (req, res) => {
        if(req.query.userId) {
            const token = await TokenController.add(genToken(), req.query.userId);
            if(token) res.status(201).send(token);
            else res.status(500).send({ message: 'Internal Server Error - We are unable to create your token' });
        } else res.status(400).send({ message: 'Bad Request - User\'s id is required' });
    });

export default router;