import { Router } from 'express';
import { connectUserRoutes } from './user.route';
import { User } from '../data_access';

export const router = Router();
connectUserRoutes(User, router);
