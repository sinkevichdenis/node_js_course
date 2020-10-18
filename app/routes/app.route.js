import { Router } from 'express';
import { connectRoutes } from './user.route';
import { connectGroupUserRoutes } from './usergroup.route';
import { connectAuthRoutes } from './auth.routes';
import { User, Group, UserGroup } from '../data_access';

export const router = Router();
connectAuthRoutes('/login', router);
connectRoutes('/user', User, router);
connectRoutes('/group', Group, router);
connectRoutes('/general', UserGroup, router);
connectGroupUserRoutes('/general', router);
