import React from 'react';
import './Results.css'

export const Results = ({isLoading, onClick, resultList, data}) => {
    const listItems = data.map(item => <li key={item.id}>{JSON.stringify(item)}</li>)
    return <div className='results-container'>
        <button id='getListBtn' disabled={isLoading} onClick={onClick}>Get users list</button>
        <ul>
            {listItems}
        </ul>
    </div>
};
