import {restMiddleware} from "../middlewars";

const modelMock = {
    getList: () => 'getLIst',
    get: () => 'get',
    put: () => 'put',
    post: () => 'post',
    remove: () => 'remove',
};

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe("User model",  () => {
    const rest = () => restMiddleware(modelMock);
    it('should return true rest', () => {
        console.log('REST', rest);
        expect(rest).toBeTruthy();
    })
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
