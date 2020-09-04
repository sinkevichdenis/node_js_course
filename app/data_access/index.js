import { Sequelize } from 'sequelize';
import config from '../config';
import { defineUserModel } from '../models/user.model';

const dbUrl = config.get('url');

const sequelize = new Sequelize(dbUrl);
export const User = defineUserModel(sequelize);

(async () => {
    await sequelize.sync();
    console.log('Sync completed');
})();
