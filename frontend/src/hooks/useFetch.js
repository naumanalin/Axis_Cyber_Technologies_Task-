import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (method, route,  body = null, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const base_url = 'https://budget-tracker-server-lilac.vercel.app'
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios({
                    url: `${base_url}${route}`,
                    method,
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
    }, [method, route, body]);

    return { data, error, isLoading };
};

export default useFetch;