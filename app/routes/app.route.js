import { Router } from "express";
import { connectRoutes } from "./user.route";
import { User, Group } from "../data_access";

export const router = Router();
connectRoutes("/user", User, router);
connectRoutes("/group", Group, router);
