import '../styles/NotFound.css';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <button className="not-found-button" onClick={handleGoHome}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
