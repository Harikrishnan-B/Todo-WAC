import React from 'react';
import useInfiniteSWR from '../hooks/useInifiniteSWR'
import { ClipLoader } from 'react-spinners';
import "../assets/InfiniteScrolling.css";

const InfiniteScrollingSWR = () => {
  const { posts, isLoading, isError, observerRef, hasMore, isValidating } = useInfiniteSWR(
    'https://jsonplaceholder.typicode.com/posts',
    8 // Limit of posts per page
  );

  return (
    <div className="container mt-5">
      {/* Post Cards */}
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-3 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <p className="card-id">ID: {post.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading spinner */}
      {isValidating && (
        <div className="d-flex justify-content-center my-4">
          <ClipLoader color="#007bff" loading={true} size={50} />
        </div>
      )}

      {/* Error message */}
      {isError && <p className="text-center text-danger">Error loading data.</p>}

      {/* No more data message */}
      {!isValidating && !hasMore && posts.length > 0 && (
        <p className="text-center my-4">No more posts to display.</p>
      )}

      {/* IntersectionObserver trigger */}
      <div ref={observerRef} style={{ height: '1px', backgroundColor: 'transparent' }} />
    </div>
  );
};

export default InfiniteScrollingSWR;
