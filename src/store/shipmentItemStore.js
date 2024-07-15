import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import {$authHost, $host} from "../http/index";

class ShipmentItemStore {
  shipmentItems = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchShipmentItems = async (shipmentId) => {
    this.isLoading = true;
    try {
      const response = await $host.get(`/api/shipment/${shipmentId}/items`);
      runInAction(() => {
        this.shipmentItems = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createShipmentItem = async (shipmentId, itemData) => {
    this.isLoading = true;
    try {
      const response = await $host.post(`/api/shipment/${shipmentId}/items`, itemData);
      runInAction(() => {
        this.shipmentItems.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateShipmentItem = async (shipmentId, itemId, updates) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/shipment/${shipmentId}/items/${itemId}`, updates);
      runInAction(() => {
        const index = this.shipmentItems.findIndex((i) => i.id === itemId);
        this.shipmentItems[index] = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteShipmentItemsByShipmentId = async (shipmentId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/shipments/${shipmentId}/items`);
      runInAction(() => {
        this.shipmentItems = this.shipmentItems.filter((i) => i.shipmentId !== shipmentId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default ShipmentItemStore;