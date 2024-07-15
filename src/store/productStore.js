import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import {$authHost, $host} from "../http/index";

class ProductStore {
  products = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  fetchProducts = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/product');
      runInAction(() => {
        this.products = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  fetchProduct = async (productId) => {
    this.isLoading = true;
    try {
      const response = await $host.get(`/api/product/${productId}`);
      runInAction(() => {
        this.curentProducts = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createProduct = async (productData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/product', productData);
      runInAction(() => {
        this.products.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateProduct = async (productId, updates) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/product/${productId}`, updates);
      runInAction(() => {
        const index = this.products.findIndex((p) => p.id === productId);
        this.products[index] = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteProduct = async (productId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/product/${productId}`);
      runInAction(() => {
        this.products = this.products.filter((p) => p.id !== productId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default ProductStore;