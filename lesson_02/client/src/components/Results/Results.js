import React from 'react';
import './Results.css'

export const Results = ({isLoading, onClick, resultList, data}) => {
    const listItems = data.map(item => <li key={item.id}>{JSON.stringify(item)}</li>)
    return <div className='results-container'>
        <button id='getListBtn' disabled={isLoading} onClick={onClick}>Update users list</button>
        <ul>
            {listItems.length ? listItems : 'List is empty'}
        </ul>
    </div>
};
