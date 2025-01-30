import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (apiUrl, limit = 16) => {
  const [posts, setPosts] = useState([]);  
  const [isLoading, setIsLoading] = useState(false); 
  const [isError, setIsError] = useState(false); 
  const [hasMore, setHasMore] = useState(true);  
  const [page, setPage] = useState(1); 
  const observerRef = useRef();  // Reference for the observer to trigger scroll

  // Fetch posts whenever the page changes
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(`${apiUrl}?_page=${page}&_limit=${limit}`);
        const data = await response.json();

        if (data.length === 0) {
          setHasMore(false);  
        } else {

          // Filter out duplicates by checking if the post ID already exists in the posts array

          setPosts((prevPosts) => {
            const uniquePosts = [...prevPosts, ...data].filter(
              (post, index, self) => self.findIndex((p) => p.id === post.id) === index
            );
            return uniquePosts;
          });
        }
      } catch (error) {
        setIsError(true); 
      } finally {
        setIsLoading(false);  
      }
    };

    fetchPosts();
  }, [page, apiUrl, limit]);  

  // Function to load more data (triggered by scroll)

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);  
    }
  };

  // Set up infinite scrolling using IntersectionObserver

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMore();  // Trigger loadMore when scroll reaches the observer
      }
    });


    observer.observe(observerRef.current);  // Observe the observerRef element

    return () => observer.disconnect();  // Clean up observer when component unmounts or changes
  }, [hasMore, isLoading]);  // Run the effect when hasMore or isLoading changes

  return { posts, isLoading, isError, observerRef };
};

export default useInfiniteScroll;
