import {AxiosRequestConfig} from 'axios';
import axiosInstance from './axiosInstance';
import { Coffee } from '../../components/Coffee/Coffee';

export interface ResponseList<T> {
  total: number
  items: T[]
}

export interface FetchCoffeListParams {
  take: number
  skip: number
}

export interface IPlaceOrderParams {
  coffeeId: number
  tabletId: string
}

export interface IOrder {
  id: number
  isToGo: boolean
  status: string
  baristaId: number
  coffee: Coffee
}

export const ApiService = {
  getCoffeeList: (params?: FetchCoffeListParams, options?: AxiosRequestConfig) => {
    return axiosInstance.get<ResponseList<Coffee>>("/coffee", {params, ...options});
  },
  placeOrder: (data: IPlaceOrderParams, options?: AxiosRequestConfig) =>
    axiosInstance.post<IOrder>('/orders/table', data, options),
};
