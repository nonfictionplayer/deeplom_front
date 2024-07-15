import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import shipmentItemStore from './shipmentItemStore';
import {$authHost, $host} from "../http/index";

class ShipmentStore {
  shipments = [];
  isLoading = false;
  error = null;

  constructor(shipmentItemStore) {
    makeAutoObservable(this, {}, {deep:true});
    this.shipmentItemStore = shipmentItemStore;
  }

  fetchShipments = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/shipment');
      runInAction(() => {
        this.shipments = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  fetchShipment = async (shipmentId) => {
    this.isLoading = true;
    try {
      const response = await $host.get(`/api/shipment/${shipmentId}`);
      runInAction(() => {
        this.currentShipment = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  createShipment = async (shipmentData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/shipment', shipmentData);
      runInAction(() => {
        this.shipments.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateShipment = async (shipmentId, updates) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/shipment/${shipmentId}`, updates);
      runInAction(() => {
        const index = this.shipments.findIndex((s) => s.id === shipmentId);
        this.shipments[index] = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  deleteShipment = async (shipmentId) => {
    this.isLoading = true;
    try {
      // Сначала удаляем все связанные ShipmentItem
      await this.shipmentItemStore.deleteShipmentItemsByShipmentId(shipmentId);

      // Затем удаляем сам Shipment
      await $host.delete(`/api/shipment/${shipmentId}`);

      runInAction(() => {
        this.shipments = this.shipments.filter((s) => s.id !== shipmentId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  get shiomentItems() {
    return this.currentShipment?.shipmentItems || [];
  }

  get warehouse() {
    return this.currentShipment?.Warehouse;
  }
}

export default ShipmentStore;