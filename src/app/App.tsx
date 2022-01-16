import React from 'react';
import useAppInit from '@common/hooks/app/useAppInit';

function App() {
  const { init, isLoading } = useAppInit();

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="test">{isLoading ? 'Loading...' : 'Hello World!!!'}</div>
  );
}

export default App;
