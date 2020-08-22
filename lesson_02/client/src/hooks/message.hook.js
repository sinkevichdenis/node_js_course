import {useCallback} from 'react';
import {ToastsStore} from 'react-toasts';

export const useMessage = () => (
    useCallback((text, type) => {
        console.log('text', text)
        if (text) {
            ToastsStore[type](text);
            console.log('inside', text)
        }
    }, [])
);
