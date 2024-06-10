'use client'

import { useEffect, useState } from "react";

export default function useFetch(apiFunction: any, initialValue: any) {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialValue);

    useEffect(() => {
        executeAPIFunction()
    }, [apiFunction])

    async function executeAPIFunction() {
        setIsLoading(true)
        try {
            const response = await apiFunction();
            const resData = await response.json();
            if (!response.ok) {
                throw new Error('Error mutating/fetching data: ' + `${response.status}  ${response.statusText}`)
            }

            setData(resData)
            setIsLoading(false)
        } catch (err: any) {
            setError(err)
            setIsLoading(false)
        }
    }

    return { error, isLoading, data, setData, callApi: executeAPIFunction };
}