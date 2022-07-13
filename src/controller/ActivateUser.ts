import { Request, Response } from 'express';
import { AppDataSource } from '../database/Config';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';

class ActivateUser {
    async execute(req: Request, res: Response) {
        const { email, token } = req.body;
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
                return res.status(401).json('Invalid or expired activation token!');
            }

            if (token != user.tokenActivate) {
                return res.status(401).json('Invalid activation token!');
            }

            AppDataSource.manager.update(User, userId, {
                isActivate: true,
                tokenActivate: '',
            })

            return res.status(200).json('Active User!');

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new ActivateUser();