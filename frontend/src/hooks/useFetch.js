// hooks/useFetch.js
import { useState, useCallback } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const base_url = 'https://budgettrackerbackend.vercel.app';

    const fetchData = useCallback(async (method, route, body = null, options = {}) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const url = `${base_url}${route}`;
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            };

            const config = {
                method,
                headers,
                credentials: 'include', // Equivalent to withCredentials: true
                ...options,
            };

            if (body) {
                config.body = JSON.stringify(body);
            }

            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }

            const responseData = await response.json();
            setData(responseData);
            return responseData;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { data, error, isLoading, fetchData };
};

export default useFetch;