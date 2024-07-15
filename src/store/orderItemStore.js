import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import {$authHost, $host} from "../http/index";

class OrderItemStore {
  orderItems = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  createOrderItem = async (orderItem) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/order-items', orderItem);
      runInAction(() => {
        this.orderItems.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  fetchOrderItemsByOrderId = async (orderId) => {
    this.isLoading = true;
    try {
      const response = await $host.get(`/api/orders/${orderId}/items`);
      runInAction(() => {
        this.orderItems = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateOrderItem = async (orderItemId, updatedData) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/order-items/${orderItemId}`, updatedData);
      runInAction(() => {
        this.orderItems = this.orderItems.map((item) =>
          item.id === orderItemId ? response.data : item
        );
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteOrderItemsByOrderId = async (orderId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/orders/${orderId}/items`);
      runInAction(() => {
        this.orderItems = this.orderItems.filter((i) => i.orderId !== orderId);
      });
    } catch (err) {
        this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default OrderItemStore;