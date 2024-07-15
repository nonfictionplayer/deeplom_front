import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import {$authHost, $host} from "../http/index";

class CustomerStore {
  customers = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCustomers = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/customer');
      runInAction(() => {
        this.customers = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  fetchCustomer = async (customerId) => {
    this.isLoading = true;
    try {
      const response = await $host.get(`/api/customer/${customerId}`);
      runInAction(() => {
        this.curentCustomers = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createCustomer = async (customerData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/customer', customerData);
      runInAction(() => {
        this.customers.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateCustomer = async (customerId, updatedData) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/customer/${customerId}`, updatedData);
      runInAction(() => {
        this.customers = this.customers.map((customer) =>
          customer.id === customerId ? response.data : customer
        );
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteCustomer = async (customerId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/customer/${customerId}`);
      runInAction(() => {
        this.customers = this.customers.filter((customer) => customer.id !== customerId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default CustomerStore;