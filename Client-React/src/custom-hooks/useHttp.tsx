import axios from "axios";
import { useCallback, useState } from "react";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const serverInstance = axios.create({
    baseURL: 'http://localhost:3000',
})

export function useHttp<T>(url: string, method: HttpMethod = 'get') {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<T>();


    const request = useCallback(async (customUrl?: string, methodOverride?: HttpMethod, body?: any) => {
        const finalUrl = customUrl || url;
        const finalMethod = methodOverride || method;
        setLoading(true);
        setError('');
        try {
            let result;

            if (finalMethod === 'get' || finalMethod === 'delete') {
                result = await serverInstance[finalMethod]<T>(finalUrl);
            } else {
                result = await serverInstance[finalMethod]<T>(finalUrl, body);
            }

            setData(result.data as T);
        } catch (error) {
            setError('error occurred, try again later');
            console.error('Error while fetching:', error);
        } finally {
            setLoading(false);
        }
    }, [method, url]);
    return { loading, error, data, request };
}