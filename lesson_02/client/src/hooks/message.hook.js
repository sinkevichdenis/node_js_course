import {useCallback} from 'react';
import {ToastsStore} from 'react-toasts';

export const useMessage = () => (
    useCallback((text, type) => {
        if (text) {
            ToastsStore[type](text);
            console.log('inside', text)
        }
    }, [])
);
