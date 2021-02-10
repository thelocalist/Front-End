import { useState } from 'react';

import axios from 'axios';

const useApiRequest = (method, path) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const request = (options) => {
    setIsloading(true);
    setApiError(null);
    return axios({
      method,
      url: `${process.env.REACT_APP_API_URL}${path}`,
      params: { ...options },
    })
      .then((response) => {
        setData(response.data);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setApiError(error);
        console.log(error);
      });
  };
  return [data, request, isLoading, apiError];
};

export default useApiRequest;
