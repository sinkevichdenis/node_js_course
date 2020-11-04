import { Router } from 'express';
import { connectRoutes } from './user.route';
import { connectGroupUserRoutes } from './usergroup.route';
import { connectAuthRoutes } from './auth.routes';
import { User, Group, UserGroup } from '../data_access';
import {connectModel} from "../services";

export const privateRouter = Router();
export const publicRouter = Router();

connectAuthRoutes('/login', publicRouter);

connectRoutes('/user', connectModel(User), privateRouter);
connectRoutes('/group', connectModel(Group), privateRouter);
connectRoutes('/general', connectModel(UserGroup), privateRouter);
connectGroupUserRoutes('/general', privateRouter);
