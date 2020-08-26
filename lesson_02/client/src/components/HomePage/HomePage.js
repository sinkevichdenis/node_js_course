import React, {useEffect, useState} from 'react';
import {useMessage, useHttp} from '../../hooks';
import {Results} from '../Results';
import {Form} from '../Form';
import './HomePage.css';

export const HomePage = () => {
    const initialUser = {
        login: '',
        password: '',
        age: null,
        isDeleted: false,
    };
    const [form, setForm] = useState(initialUser);
    const [users, setUsers] = useState([]);

    const {isLoading, request, error, clearErrors} = useHttp();
    const message = useMessage();

    useEffect(()=> {
        message(error, 'error');
        clearErrors();
    }, [error, message, clearErrors]);

    const onChange = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const handleRequest = async (callback) => {
        try {
            const data = await callback();
            message(data.message,'success');
            setForm({...initialUser});
        } catch (e) {
            message(e.message,'error');
        }
    };

    const onAdd = async () => {
        await handleRequest( () => request('/', 'POST', {...form}));
    };
    const onUpdate = async () => {
        await handleRequest( () => request('/', 'PUT', {...form}));
    };
    const onRemove = async () => {
        await handleRequest( () => request('/', 'DELETE', {login: form.login}));
    };

    const onGetList = async() => {
        try {
            const data = await request('/list');
            setUsers(data.users);
            message(data.message,'success');
        } catch (e) {
            message(e.message,'error');
        }
    };

    return (
        <div className="container">
            <h1>Lesson 02</h1>
            <Form
                onAdd={onAdd}
                onUpdate={onUpdate}
                onRemove={onRemove}
                onChange={onChange}
                formData={form}
                isLoading={isLoading}
            />
            <Results isLoading={isLoading} data={users} onClick={onGetList} />
        </div>
    );
};
