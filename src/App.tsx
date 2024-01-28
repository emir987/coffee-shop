import React, { useEffect, useState } from 'react';
import CoffeeList from './components/Coffee/CoffeeList';
import './App.scss';
import { useFetchCoffeeList } from './services/api/hooks/useCoffee';
import { FetchCoffeListParams } from './services/api/ApiService';
import ScrollLoader from './components/ScrollLoader';
import { UniqueIdProvider } from './context/UniqueIdContext';
import OrderNotification from './components/Order/Notification';
import { AlertProvider } from './context/AlertContext';
import ErrorBoundary from './components/ErrorBoundary';
import FallbackPage from './pages/FallbackPage';
import { Typography } from '@mui/material';

const App: React.FC = () => {
  const [params, setParams] = useState<FetchCoffeListParams>({
    take: 2,
    skip: 0,
  });

  const { coffeeList, loading, total, fetchCofeeList } = useFetchCoffeeList(params);

  const fetchMore = () => {
    if (params?.skip + 2 >= total) return;
    setParams((prev) => ({
      ...prev,
      skip: prev.skip + 2,
    }));
  };

  useEffect(() => {
    params && fetchCofeeList();
  }, [params, fetchCofeeList]);

  return (
    <div className="App">
      <ErrorBoundary fallback={<FallbackPage />}>
        <AlertProvider>
          <UniqueIdProvider>
            <OrderNotification onClose={() => console.log('Notification closed')} />

            <Typography variant="h2" gutterBottom className='dark-text'>
              Caffeine Corner
            </Typography>
            <ScrollLoader onIntersect={fetchMore} isLoading={loading}>
              <CoffeeList coffees={coffeeList} />
            </ScrollLoader>

          </UniqueIdProvider>
        </AlertProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
