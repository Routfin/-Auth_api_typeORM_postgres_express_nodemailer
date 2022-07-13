import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../database/Config";
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/mailer";

class forgotPasswordController {
    async authenticate(req: Request, res: Response) {
        const { email } = req.body;
        const secret = process.env.JWT_SEC as string;

        try {
            const user = await AppDataSource.manager.findOneBy(User, {
                email: email
            });

            const idUser = user?.id;

            if (!user) {
                return res.status(401).json('Email not registered!');
            };


            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: process.env.EXPIRES_RESETJWT,
            });

            if (!token) {
                return res.status(401).json('Expired token, please try again.')
            }

            await AppDataSource.manager.update(User, idUser, {
                tokenResetPass: token,
            });             

        sendEmail({
            from: 'noreply@email.com',
            to: user.email,
            subject: 'Reset Password E-mail',
            text: 'Token sending email to reset password',
            html: `<h2>Copy the generated token below to reset your password</h2>
                    <h4>${token}</h4>
            `,
        });

        return res.status(200).json('Password token sent!');
        } catch (err) {
            return res.status(500).json(err);
        }

    }
}

export default new forgotPasswordController();