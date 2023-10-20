import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout } from './components';
import Routers from './Routers';
import { useLocation } from 'react-router-dom';
import { isEmpty } from './utils';

const App: React.FC = () => {
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState<string>('/login');

  useEffect(() => {
    setCurrentPathName(location.pathname);
  }, [location.pathname]);

  return !isEmpty(currentPathName) &&
    (currentPathName === '/login' || currentPathName === '/register') ? (
    <Routers />
  ) : (
    <Layout>
      <Routers />
    </Layout>
  );
};

export default App;
