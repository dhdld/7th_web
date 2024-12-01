import { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
}

function useCustomFetch<T>(url: string) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        isLoading: false,
        isError: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            setState((prev) => ({ ...prev, isLoading: true }));
            try {
                const response = await axiosInstance.get<T>(url);
                setState({ data: response.data, isLoading: false, isError: false });
            } catch (e) {
                console.error(e);
                setState({ data: null, isLoading: false, isError: true });
            }
        };

        fetchData();
    }, [url]);

    return state;
}

export default useCustomFetch;
