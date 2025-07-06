const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <div>
            <h3 className="">Oops! Something went wrong: {error.message}</h3>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    );
};
  
export default ErrorFallback;