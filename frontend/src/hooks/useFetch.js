import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (method = 'GET', route, body = null, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const base_url = 'https://budgettrackerbackend.vercel.app';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios({
                    method,
                    url: `${base_url}${route}`,
                    data: body,
                    withCredentials: true,
                    ...options,
                });
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [method, route, JSON.stringify(body), JSON.stringify(options)]);

    return { data, error, isLoading };
};

export default useFetch;


// const { data, error, isLoading } = useFetch('POST', '/login', { email, password }, { headers: { Authorization: 'Bearer token' } });
