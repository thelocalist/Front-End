import { useState } from 'react';

import axios from 'axios';

const useApiRequest = (method, path) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [itemsCount, setItemsCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [savedOptions, setSavedOptions] = useState(null);
  const request = (options) => {
    setIsloading(true);
    setApiError(null);
    setSavedOptions(options);
    return axios({
      method,
      url: `${process.env.REACT_APP_API_URL}${path}`,
      params: { ...options, pageIndex: currentPage },
    })
      .then((response) => {
        console.log(response.data);
        if (!response.data.rows.length) {
          setData(['empty']);
        } else {
          setData(response.data.rows);
        }

        setItemsCount(response.data.count);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setApiError(error);
        console.log(error);
      });
  };

  const getNextPage = () => {
    if ((currentPage + 1) * savedOptions.pageSize > itemsCount) {
      return null;
    }
    return axios({
      method,
      url: `${process.env.REACT_APP_API_URL}${path}`,
      params: { ...savedOptions, pageIndex: currentPage + 1 },
    })
      .then((response) => {
        setData(response.data.rows);
        setCurrentPage((prevPage) => prevPage + 1);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setApiError(error);
        console.log(error);
      });
  };

  const getPreviousPage = () => {
    if (currentPage - 1 < 0) {
      return null;
    }
    return axios({
      method,
      url: `${process.env.REACT_APP_API_URL}${path}`,
      params: { ...savedOptions, pageIndex: currentPage - 1 },
    })
      .then((response) => {
        setData(response.data.rows);
        setCurrentPage((prevPage) => prevPage - 1);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setApiError(error);
        console.log(error);
      });
  };

  const resetSearch = () => {
    setData(null);
    setCurrentPage(0);
  };

  return [
    data,
    request,
    isLoading,
    apiError,
    itemsCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
  ];
};

export default useApiRequest;
