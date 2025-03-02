import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (method, route, body = null, dependency = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const base_url = 'https://budget-tracker-server-lilac.vercel.app';

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios({
                url: `${base_url}${route}`,
                method,
                data: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true,
            });

            setData(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [method, route, JSON.stringify(body)], dependency);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, isLoading, refetch: fetchData }; 
};


export default useFetch;
