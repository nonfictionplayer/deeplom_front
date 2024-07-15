import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import {$authHost, $host} from "../http/index";

class OrderTypeStore {
  orderTypes = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchOrderTypes = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/ordertype');
      runInAction(() => {
        this.orderTypes = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createOrderType = async (orderTypeData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/ordertype', orderTypeData);
      runInAction(() => {
        this.orderTypes.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateOrderType = async (orderTypeId, updatedData) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/ordertype/${orderTypeId}`, updatedData);
      runInAction(() => {
        this.orderTypes = this.orderTypes.map((orderType) =>
          orderType.id === orderTypeId ? response.data : orderType
        );
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteOrderType = async (orderTypeId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/ordertype/${orderTypeId}`);
      runInAction(() => {
        this.orderTypes = this.orderTypes.filter((orderType) => orderType.id !== orderTypeId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default OrderTypeStore;