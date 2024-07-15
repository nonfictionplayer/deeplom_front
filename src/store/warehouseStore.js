import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import {$authHost, $host} from "../http/index";

class WarehouseStore {
  warehouses = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchWarehouses = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/warehouse');
      runInAction(() => {
        this.warehouses = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createWarehouse = async (warehouseData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/warehouse', warehouseData);
      runInAction(() => {
        this.warehouses.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateWarehouse = async (warehouseId, updates) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/warehouse/${warehouseId}`, updates);
      runInAction(() => {
        const index = this.warehouses.findIndex((w) => w.id === warehouseId);
        this.warehouses[index] = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteWarehouse = async (warehouseId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/warehouse/${warehouseId}`);
      runInAction(() => {
        this.warehouses = this.warehouses.filter((w) => w.id !== warehouseId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default WarehouseStore;