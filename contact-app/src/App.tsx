import { useEffect } from 'react'
import './App.css'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { onErrorCallback } from './utils/onErrorCallback.ts';
import ErrorFallback from './components/ErrorFallback.tsx';
import { initVitalsMonitoring } from './utils/monitorVitals.ts';
import ErrorThrower from './components/ErrorThrower.tsx';

function App() {
  useEffect(() => {
    initVitalsMonitoring();
  }, []);

  function throwError() {
    throw new Error('Simulated error!');
  }


  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onErrorCallback}
    >
      <div>
        <h1>React App with Web Vitals & Error Boundary</h1>
        <button onClick={throwError}>Trigger Error</button>
        <ErrorThrower />
      </div>
    </ReactErrorBoundary>
  )
}

export default App
