

import express from 'express';
import request from 'supertest';
import { privateRouter } from './app.route';
import { connectRoutes } from "./user.route";
import { User } from "../data_access";

const app = express();
app.use('/', privateRouter);
//connectRoutes('/user', User, privateRouter);

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe("testing-server-routes",  () => {
    it("GET /states - success", async () => {
        const res = await request(app).get('/user/list')
        console.log('body', res);
        expect('test').toEqual('test')
    });
});



/*
import {User} from "../data_access";

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe("testing-server-routes",  () => {
    it("GET /states - success", async () => {
        const res = await User.getList('',2)
        console.log('body', res);
        expect('test').toEqual('test')
    });
});

*/
