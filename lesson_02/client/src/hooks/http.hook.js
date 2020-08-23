import {useCallback, useState} from "react";

export const useHttp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            console.log('response',response);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);
    const clearErrors = useCallback(() => setError(null), []);
    return {isLoading, request, error, clearErrors}
};
