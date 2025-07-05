const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    console.log(error,'dd');
    
    return (
        <div>
            <h1>Oops! Something went wrong: {error.message}</h1>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    );
};
  
export default ErrorFallback;