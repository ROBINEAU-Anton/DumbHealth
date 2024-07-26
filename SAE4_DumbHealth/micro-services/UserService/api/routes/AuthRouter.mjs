import express from 'express';
import bcrypt from 'bcrypt';
import UserController from '../controllers/UserController.mjs';
import User from '../models/User.mjs';
import TokenController from '../controllers/TokenController.mjs';
import { genToken } from '../../tools/genToken.mjs';

const saltRounds = 10;
const router = express.Router();

// /auth route
router
    .route('/auth')
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
    });

export default router;