import utils from '../services/utils.service';
import {restMiddleware} from "../middlewars";

describe("test restMiddleware as User/Group controllers",  () => {
    let nextMock, jsonMock, sendMock, resMock, rest, statusMock;
    const mockError = new Error;
    const createError = () => {
        throw mockError;
    };
    const modelMock = {
        getList: () => 'getLIst',
        get: () => 'get',
        create: () => 'create',
        update: () => 'update',
        remove: () => 'remove',
    };

    beforeEach(()=> {
        nextMock = jest.fn();
        sendMock = jest.fn();
        jsonMock = jest.fn();
        statusMock = jest.fn();
        resMock = {
            json: (x) => {
                jsonMock(x);
                return resMock;
            },
            status: (x) => {
                statusMock(x);
                return resMock;
            },
        };
        rest = restMiddleware(modelMock);
    });

    afterEach(() => {
       jest.clearAllMocks();
    });

    describe("test getList command",  () => {
        it('should handle empty query', async () => {
            const spy = jest.spyOn(modelMock, 'getList');
            const reqMock = {query: {}};
            await rest.getList(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith('', 10);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle complex query', async () => {
            const spy = jest.spyOn(modelMock, 'getList');
            const reqMock = {query: {substr: 'test', limit: 3}};
            await rest.getList(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith('test', 3);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle error', async () => {
            const spy = jest.spyOn(modelMock, 'getList').mockImplementation(createError);
            const reqMock = {query: {}};
            await rest.getList(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalled();
            expect(jsonMock).not.toHaveBeenCalled();
            expect(statusMock).not.toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith(mockError);
        });
    });

    describe("test get command",  () => {
        it('should handle query without id', async () => {
            const spy = jest.spyOn(modelMock, 'get');
            const reqMock = {params: {id: undefined}};
            await rest.get(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle query with id', async () => {
            const spy = jest.spyOn(modelMock, 'get');
            const reqMock = {params: {id: 'test'}};
            await rest.get(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle error', async () => {
            const spy = jest.spyOn(modelMock, 'get').mockImplementation(createError);
            const reqMock = {params: {id: 'test'}};
            await rest.get(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalled();
            expect(jsonMock).not.toHaveBeenCalled();
            expect(statusMock).not.toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith(mockError);
        });
    });

    describe("test post command",  () => {
        it('should handle query without body', async () => {
            const spy = jest.spyOn(modelMock, 'create');
            const reqMock = {};
            await rest.post(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.body);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle query with body', async () => {
            const spy = jest.spyOn(modelMock, 'create');
            const reqMock = {body: test};
            await rest.post(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.body);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle error', async () => {
            const spy = jest.spyOn(modelMock, 'create').mockImplementation(createError);
            const reqMock = {body: test};
            await rest.post(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalled();
            expect(jsonMock).not.toHaveBeenCalled();
            expect(statusMock).not.toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith(mockError);
        });
    });

    describe("test put command",  () => {
        it('should handle query without body and id', async () => {
            const spy = jest.spyOn(modelMock, 'update');
            const reqMock = {params: {id: undefined}, body: undefined};
            await rest.put(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle query only without body', async () => {
            const spy = jest.spyOn(modelMock, 'update');
            const reqMock = {params: {id: 'id'}, body: undefined};
            await rest.put(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle query only without id', async () => {
            const spy = jest.spyOn(modelMock, 'update');
            const reqMock = {params: {id: undefined}, body: 'body'};
            await rest.put(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle query with body and id', async () => {
            const spy = jest.spyOn(modelMock, 'update');
            const reqMock = {params: {id: 'id'}, body: 'body'};
            await rest.put(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params?.id, reqMock.body);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle error', async () => {
            const spy = jest.spyOn(modelMock, 'update').mockImplementation(createError);
            const reqMock = {params: {id: 'id'}, body: 'body'};
            await rest.put(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalled();
            expect(jsonMock).not.toHaveBeenCalled();
            expect(statusMock).not.toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith(mockError);
        });
    });

    describe("test remove command",  () => {
        it('should handle query without id', async () => {
            const spy = jest.spyOn(modelMock, 'remove');
            const reqMock = {params: {id: undefined}};
            await rest.remove(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle query with id', async () => {
            const spy = jest.spyOn(modelMock, 'remove');
            const reqMock = {params: {id: 'test'}};
            await rest.remove(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalledWith(reqMock.params.id);
            expect(jsonMock).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should handle error', async () => {
            const spy = jest.spyOn(modelMock, 'remove').mockImplementation(createError);
            const reqMock = {params: {id: 'test'}};
            await rest.remove(reqMock, resMock, nextMock);
            expect(spy).toHaveBeenCalled();
            expect(jsonMock).not.toHaveBeenCalled();
            expect(statusMock).not.toHaveBeenCalledWith(200);
            expect(nextMock).toHaveBeenCalledWith(mockError);
        });
    });
});
