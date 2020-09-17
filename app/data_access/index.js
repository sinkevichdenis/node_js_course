import { Sequelize } from "sequelize";
import config from "../config";
import { defineUserModel, defineGroupModel } from "../models";

const dbUrl = config.get("url");

const sequelize = new Sequelize(dbUrl);
export const User = defineUserModel(sequelize);
export const Group = defineGroupModel(sequelize);

(async () => {
    await sequelize.sync();
    console.log("Sync completed");
})();
