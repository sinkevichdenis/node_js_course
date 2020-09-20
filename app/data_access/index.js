import { Sequelize } from 'sequelize';
import config from '../config';
import { defineUserModel, defineGroupModel, defineGeneralModel } from '../models';

const dbUrl = config.get('url');

const sequelize = new Sequelize(dbUrl);
export const User = defineUserModel(sequelize);
export const Group = defineGroupModel(sequelize);
export const UserGroup = defineGeneralModel(sequelize);

User.hasMany(UserGroup, { foreignKey: 'user_id', sourceKey: 'id' });
Group.hasMany(UserGroup, { foreignKey: 'group_id', sourceKey: 'id' });
UserGroup.belongsTo(User, { foreignKey: 'user_id' });
UserGroup.belongsTo(Group, { foreignKey: 'group_id' });
User.belongsToMany(Group, { through: UserGroup, foreignKey: 'user_id' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'group_id' });

(async () => {
    await sequelize.sync()
        .then(() => console.log('Sync completed'));
/*        .then(async () => {
            let user1 = await User.create({
                login: 'create', password: 'create', age: 20, groups: [
                    {name: 'test1', permissions: 'DELETE'},
                    {name: 'test2', permissions: 'WRITE'}
                ]
            }, {include: 'groups'})

            let user2 = await User.create({login: 'createNew', password: 'createNew', age: 20});
            let group1 = await Group.create({name: 'test3', permissions: 'WRITE'})

            group1.addUser(user2);

        })*/
})();
