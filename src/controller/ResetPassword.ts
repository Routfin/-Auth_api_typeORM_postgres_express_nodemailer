import { Request, Response } from 'express';
import { AppDataSource } from '../database/Config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

class ResetPasswordController {
    async execute(req: Request, res: Response) {
        const { email, token, password } = req.body;
        const secret = process.env.JWT_SEC as string;

        try {

            const user = await AppDataSource.manager.findOneBy(User, {
                email: email
            });

            const userId = user?.id;

            if (!user) {
                return res.status(401).json('Email not registered!');
            };

            const data = jwt.verify(token, secret);


            if (!data) {
                return res.status(401).json('Invalid or expired token!');
            }

            if (token != user.tokenResetPass) {
                return res.status(401).json('Invalid token!');
            }

            const newPass = bcrypt.hashSync(password, 8);

            try {
                await AppDataSource.manager.update(User, userId, {
                    password: newPass,
                    tokenResetPass: '',
                });
                return res.status(200).json('Your password has been updated!');        
         
            } catch (err) {
                return res.status(500).json(err);
            }

        } catch (err) {
            return res.status(500).json(err);
        }

    }
}

export default new ResetPasswordController();