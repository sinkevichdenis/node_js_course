import { Router } from 'express';
import { connectRoutes } from './user.route';
import { connectGroupUserRoutes } from './usergroup.route';
import { User, Group, UserGroup } from '../data_access';

export const router = Router();
connectRoutes('/user', User, router);
connectRoutes('/group', Group, router);
connectRoutes('/general', UserGroup, router);
connectGroupUserRoutes('/general', router);
