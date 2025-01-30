


import React from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScrolling';
import { ClipLoader } from 'react-spinners';
import "../assets/InfiniteScrolling.css";

const InfiniteScrolling = () => {
  // Use the custom hook
  const { posts, isLoading, isError, observerRef } = useInfiniteScroll(
    'https://jsonplaceholder.typicode.com/posts', // API URL
    16  // Limit of 8 posts per page
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

                {/* Displaying the id within the card */}
                <p className="card-id">ID: {post.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spinner while loading new data */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <ClipLoader color="#007bff" loading={true} size={50} />
        </div>
      )}

      {isError && <p className="text-center text-danger">Error loading data</p>}

      {!isLoading && !posts.length && <div className="text-center my-4"><p>No data available.</p></div>}
      
      

      <div ref={observerRef} style={{ height: '1px', backgroundColor: 'transparent' }} />
    </div>
  );
};

export default InfiniteScrolling;
