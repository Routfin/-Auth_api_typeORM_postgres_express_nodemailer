import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import userRoutes from './src/routes/UserRoutes';
import activateUserRoutes from './src/routes/ActivateUserRoute';
import authRoute from './src/routes/AuthRoute';
import forgotPassRoute from './src/routes/ForgotPassRoute';


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser());

app.use('/user', userRoutes)
app.use('/activate', activateUserRoutes)
app.use('/auth', authRoute)
app.use('/forgotpass', forgotPassRoute)

export default app;