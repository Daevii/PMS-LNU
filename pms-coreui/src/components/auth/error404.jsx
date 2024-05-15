import React from 'react'
const error404 = () => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p className="lead">The page you are looking for does not exist.</p>
          <div className="mt-5">
            <a href="/" className="btn btn-primary btn-lg">Go Back Home</a>
          </div>

        </div>
      </div>
    </>

  )
}

export default error404