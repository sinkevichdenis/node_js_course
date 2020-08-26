import React from 'react';
import './Form.css'

export const Form = ({onAdd, onUpdate, onRemove, onChange, formData, isLoading}) => (
    <form>
        <div className='input'>
            <label htmlFor='login'>Login</label>
            <input
                id='login'
                type='text'
                name='login'
                value={formData.login}
                onChange={onChange}
            />
        </div>
        <div className='input'>
            <label htmlFor='password'>Password</label>
            <input
                id='password'
                type='password'
                name='password'
                value={formData.password}
                onChange={onChange}
            />
        </div>
        <div className='input'>
            <label htmlFor='age'>Age</label>
            <input
                id='age'
                type='number'
                name='age'
                value={!!formData.age && formData.age}
                onChange={onChange}
            />
        </div>
        <div>
            <button id='addBtn' disabled={isLoading} onClick={onAdd}>Add</button>
            <button id='updateBtn' disabled={isLoading} onClick={onUpdate}>Update</button>
            <button id='removeBtn' disabled={isLoading} onClick={onRemove}>Remove</button>
        </div>
    </form>
);
