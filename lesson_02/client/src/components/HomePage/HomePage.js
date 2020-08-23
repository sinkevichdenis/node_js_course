import React, {useEffect, useState} from 'react';
import uuid from 'react-uuid';
import {useMessage, useHttp} from '../../hooks';
import {Results} from '../Results';
import {Form} from '../Form';
import './HomePage.css';

export const HomePage = () => {
    const initialUser = {
        id: null,
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

    const onAdd = async () => {
        try {
            const id = uuid();
            const data = await request('/', 'POST', {...form, id});
            console.log('POST', data);
            message(data.message,'success');
            setForm({...initialUser});
        } catch (e) {
            message(e.message,'error');
        }
    };
    const onUpdate = async () => {
        console.log('update', form)
        try {
            const data = await request('/', 'PUT', {...form});
            message(data.message,'success');
            setForm({...initialUser});
        } catch (e) {
            message(e.message,'error');
        }
    };
    const onRemove = async () => {
        console.log('delete', form)
        try {
            const data = await request('/', 'DELETE', {login: form.login});
            message(data.message,'success');
            setForm({...initialUser});
        } catch (e) {
            message(e.message,'error');
        }
    };

    const onGetList = async() => {
        try {
            const data = await request('/api');
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
