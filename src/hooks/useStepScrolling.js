

import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const usePaginatedPosts = (limit = 8) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`,
    fetcher
  );

  const goToPage = (page) => setCurrentPage(page);

  return {
    posts: data,
    isLoading: !data && !error,
    isError: error,
    currentPage,
    goToPage,
  };
};

export default usePaginatedPosts;


