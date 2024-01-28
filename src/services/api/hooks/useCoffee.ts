import {useCallback, useState} from 'react';
import { Coffee } from '../../../components/Coffee/Coffee';
import { ApiService, FetchCoffeListParams } from '../ApiService';

interface FetchProductsResult {
  coffeeList: Coffee[];
  total: number;
  loading: boolean;
  fetchCofeeList: () => Promise<void>;
}

export const useFetchCoffeeList = (params: FetchCoffeListParams): FetchProductsResult => {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCofeeList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ApiService.getCoffeeList({...params});

      setCoffeeList(prevCoffeeList =>
        params.skip !== 0 ? [...prevCoffeeList, ...response.data.items] : response.data.items,
      );
      setTotal(response.data.total);

    } catch (error) {
      console.log('Error fetching products');
    } finally {
      setLoading(false);
    }
  }, [params]);

  return {coffeeList, total, loading, fetchCofeeList};
};


