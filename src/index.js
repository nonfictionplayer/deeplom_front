import React , { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import EmployeeStore from './store/employeeStore';
import ShipmentStore from './store/shipmentStore';
import WarehouseStore from './store/warehouseStore';
import ProductStore from './store/productStore';
import CustomerStore from './store/customerStore';
import OrderStore from './store/orderStore';
import ShipmentItemStore from './store/shipmentItemStore';
import OrderItemStore from './store/orderItemStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      employee: new EmployeeStore(),
      shipment: new ShipmentStore(),
      order: new OrderStore(),
      warehouse: new WarehouseStore(),
      product: new ProductStore(),
      customer: new CustomerStore(),
      shimpentItem: new ShipmentItemStore(),
      orderItem: new OrderItemStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
