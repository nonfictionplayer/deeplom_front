import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import orderItemStore from './orderItemStore';
import {$authHost, $host} from "../http/index";

class OrderStore {
  orders = [];
  isLoading = false;
  error = null;

  constructor(orderItemStore) {
    makeAutoObservable(this, {}, {deep: true});
    this.orderItemStore = orderItemStore;
  }

  fetchOrder = async (orderId) => {
    this.isLoading = true;
    try {
      const response = await $authHost.get(`/api/order/${orderId}`);
      runInAction(() => {
        this.currentOrder = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createOrder = async (orderData) => {
    this.isLoading = true;
    try {
      const response = await $authHost.post('/api/order', orderData);
      runInAction(() => {
        this.orders.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  fetchOrders = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/order');
      runInAction(() => {
        this.orders = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };


  updateOrder = async (orderId, updatedData) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/order/${orderId}`, updatedData);
      runInAction(() => {
        this.orders = this.orders.map((order) =>
          order.id === orderId ? response.data : order
        );
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteOrder = async (orderId) => {
    this.isLoading = true;
    try {
      // Сначала удаляем все связанные OrderItem
      await this.orderItemStore.deleteOrderItemsByOrderId(orderId);

      // Затем удаляем сам Order
      await $host.delete(`/api/order/${orderId}`);

      runInAction(() => {
        this.orders = this.orders.filter((o) => o.id !== orderId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
  get orderItems() {
    return this.currentOrder?.OrderItems || [];
  }

  get warehouse() {
    return this.currentOrder?.Warehouse;
  }

  get customer() {
    return this.currentOrder?.Customer;
  }

  get orderType() {
    return this.currentOrder?.OrderType;
  }

  get employee() {
    return this.currentOrder?.Employee;
  }
}

export default OrderStore;