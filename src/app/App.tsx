import React from 'react';
import useAppInit from '@common/hooks/app/useAppInit';
import Router from './Router';

function App() {
  const { init } = useAppInit();

  React.useEffect(() => {
    init();
  }, []);

  return <Router />;
}

export default App;
