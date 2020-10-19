import { Router } from 'express';
import { connectRoutes } from './user.route';
import { connectGroupUserRoutes } from './usergroup.route';
import { connectAuthRoutes } from './auth.routes';
import { User, Group, UserGroup } from '../data_access';

export const privateRouter = Router();
export const publicRouter = Router();

connectAuthRoutes('/login', publicRouter);

connectRoutes('/user', User, privateRouter);
connectRoutes('/group', Group, privateRouter);
connectRoutes('/general', UserGroup, privateRouter);
connectGroupUserRoutes('/general', privateRouter);
