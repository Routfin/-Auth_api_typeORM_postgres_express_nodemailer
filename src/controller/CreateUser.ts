import { Request, Response } from "express";
import { AppDataSource } from "../database/Config";
import sendEmail from "../utils/mailer";
import jwt from 'jsonwebtoken';

import { User } from "../entities/User";

class UserController {
    async store(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const user = new User();
        const secret = process.env.JWT_SEC as string;


        try {
            user.username = username;
            user.email = email;
            user.password = password;
            
            const userExists = await AppDataSource.manager.findOneBy(User, {
                email: user.email
            });

            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: process.env.EXPIRES_ACTIVATEJWT,
            });

            user.tokenActivate = token;

            if (userExists) {
                return res.status(409).json('User already exists');
            } else {
                await AppDataSource.manager.save(user);
            }

            sendEmail({
                from: 'noreply@email.com',
                to: user.email,
                subject: 'Activate user account',
                text: 'Token sending email to activate your account',
                html: `<h2>Copy the generated token below to confirm</h2>
                        <h4>${token}</h4>
                `,    
            })

            return res.status(200).json('Email sent! Activate your account.');
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new UserController();

