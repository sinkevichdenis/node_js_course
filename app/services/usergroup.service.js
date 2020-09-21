import { UserGroup } from '../data_access';

export const connectUserGroupModel = () => {
    const addUsersToGroup = async ({ groupId, userIds }) => await UserGroup.addUsersToGroup(groupId, userIds);

    return {
        addUsersToGroup
    };
};
