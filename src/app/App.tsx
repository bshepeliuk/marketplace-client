import React, { useEffect } from 'react';
import useAppInit from '@src/features/app/hooks/useAppInit';
import Router from './Router';

function App() {
  const { init } = useAppInit();

  useEffect(() => {
    init();
  }, []);

  return <Router />;
}

export default App;
