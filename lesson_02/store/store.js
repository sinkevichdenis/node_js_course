import uuid from 'react-uuid';
import { getStoreMatch, getIndexStoreMatch } from '../utils';
import { storeMock } from './mocks';
import { validateUser } from './validation';

const users = storeMock.users || [];

export const getAutoSuggestUsers = (substring = '', limit) => {
    const currentLimit = limit || users.length;
    return users
        .filter(item => item.login.includes(substring) && !item.isDeleted)
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, currentLimit);
};

export const getUser = async (id) => await getStoreMatch(users, id, 'id');

export const addUser = async (user) => {
    const { login } = user;
    const match = getStoreMatch(users, login, 'login');
    const isVerified = !match;

    if (isVerified) {
        await validateUser('add', user);
        users.push({ ...user, isDeleted: false, id: uuid() });
    }
    return isVerified;
};

export const updateUser = async (id, user) => {
    const index = getIndexStoreMatch(users, id, 'id');
    const isVerified = index !== -1;
    const oldUser = users[index];

    if (isVerified && !oldUser.isDeleted) {
        await validateUser('update', user);
        users.splice(index, 1, { ...oldUser, ...user });
    }
    return isVerified;
};

export const removeUser = (id) => {
    const index = getIndexStoreMatch(users, id, 'id');
    const isVerified = index !== -1;

    if (isVerified) {
        users[index] = { ...users[index], isDeleted: true };
    }
    return isVerified;
};
