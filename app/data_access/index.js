import { Sequelize } from 'sequelize';
import config from '../config';
import { defineUserModel, defineGroupModel, defineGeneralModel } from '../models';

const dbUrl = config.get('url');

const sequelize = new Sequelize(dbUrl);
export const User = defineUserModel(sequelize);
export const Group = defineGroupModel(sequelize);
export const UserGroup = defineGeneralModel(sequelize);

User.associate();
Group.associate();
UserGroup.associate();

(async () => {
    await sequelize.sync()
        .then(() => console.log('Sync completed'));
})();
