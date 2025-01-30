import { useState, useRef, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useInfiniteSWR = (baseUrl, limit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Generate the key for SWRInfinite
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // No more data
    return `${baseUrl}?_page=${pageIndex + 1}&_limit=${limit}`;
  };

  const { data, error, setSize, isValidating } = useSWRInfinite(getKey, fetcher,{revalidateFirstPage:false});

  // Flatten the paginated data into a single array
  const posts = data ? data.flat() : [];
  const isLoading = !data && !error;
  const isError = !!error;
  const hasMore = data && data[data.length - 1]?.length > 0;

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
    //   { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore && !isValidating) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [isIntersecting, hasMore, isValidating, setSize]);

  return { posts, isLoading, isError, observerRef, hasMore, isValidating };
};

export default useInfiniteSWR;


