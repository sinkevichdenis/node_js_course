import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from "../hooks/message.hook";
import './home.css'

export const HomePage = () => {
    const [form, setForm] = useState({
        login: '',
        password: '',
        age: 0,
    });
    const {isLoading, request, error, clearErrors} = useHttp();
    const message = useMessage();

    useEffect(()=> {
        console.log('Errors', error)
        message(error, 'error');
        clearErrors();
    }, [error, message, clearErrors]);

    const onChange = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const onAdd = async () => {
        try {
            const data = await request('/', 'POST', {...form});
            message(data.message,'success');
        } catch (e) {
        }
    };
    const onUpdate = () => {
    };
    const onRemove = () => {
    };

    return (
        <div className="container">
            <h1>Lesson 02</h1>
            <form>
                <div className='input'>
                    <label htmlFor='login'>Login</label>
                    <input
                        id='login'
                        type='text'
                        name='login'
                        onChange={onChange}
                    />
                </div>
                <div className='input'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        onChange={onChange}
                    />
                </div>
                <div className='input'>
                    <label htmlFor='age'>Age</label>
                    <input
                        id='age'
                        type='number'
                        name='age'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button id='addBtn' disabled={isLoading} onClick={onAdd}>Add</button>
                    <button id='updateBtn' disabled={isLoading} onClick={onUpdate}>Update</button>
                    <button id='removeBtn' disabled={isLoading} onClick={onRemove}>Remove</button>
                </div>
            </form>
        </div>
    );
}
