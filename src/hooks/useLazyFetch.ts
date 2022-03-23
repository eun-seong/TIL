import { useState } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { fetch } from '@src/utils/fetch';

const useLazyFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const lazyFetch = (params: AxiosRequestConfig) => {
    setIsLoading(true);
    fetch(params)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((error) => {
        setData(null);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { fetch: lazyFetch, data, error, isLoading };
};

export default useLazyFetch;
