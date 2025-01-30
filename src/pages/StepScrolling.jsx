

import React from 'react';
import useStepScrolling from '../hooks/useStepScrolling';
import { ClipLoader } from 'react-spinners';
import "../assets/StepScrolling.css";  // Ensure this path is correct

const StepScrolling = () => {
  const { posts, isLoading, isError, currentPage, goToPage } = useStepScrolling();

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ClipLoader color="#007bff" loading={true} size={50} />
      </div>
    );
  }

  if (isError) return <p>Error loading data</p>;

  return (
    <div className="container mt-5"> {/* Added margin-top to create space between navbar and content */}
      <div className="row">
        {posts?.map((post) => (
          <div className="col-md-3 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(10)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline-primary mx-1 ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepScrolling;
