import { useEffect } from 'react';
import useAppInit from '@src/features/app/hooks/useAppInit';
import Router from './Router';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const { init } = useAppInit();

  useEffect(() => {
    init();
  }, []);

  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
