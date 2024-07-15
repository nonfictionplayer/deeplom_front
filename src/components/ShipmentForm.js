import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import {Context} from "../index";

const ShipmentForm = observer(function ShipmentForm() {
    const { shipmentStore, customerStore, warehouseStore, shipmentItemStore, productStore } = useContext(Context);
  const [newShipment, setNewShipment] = useState({
    customerId: '',
    warehouseId: '',
    date: '',
    status: '',
  });
  const [newShipmentItem, setNewShipmentItem] = useState({
    productId: '',
    quantity: 0,
    price: 0,
  });

  const handleShipmentInputChange = (e) => {
    setNewShipment({ ...newShipment, [e.target.name]: e.target.value });
  };

  const handleShipmentItemInputChange = (e) => {
    setNewShipmentItem({ ...newShipmentItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shipment = await shipmentStore.createShipment(newShipment);
    await shipmentItemStore.createShipmentItem({ ...newShipmentItem, shipmentId: shipment.id });
    setNewShipment({
      customerId: '',
      warehouseId: '',
      date: '',
      status: '',
    });
    setNewShipmentItem({
      productId: '',
      quantity: 0,
      price: 0,
    });
  };

  return (
    <div className="form-container">
      <h2>Добавить поставку</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Заказчик:</label>
          <select id="customerId" name="customerId" value={newShipment.customerId} onChange={handleShipmentInputChange} required>
            <option value="">Выберите заказчика</option>
            {customerStore.customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="warehouseId">Склад:</label>
          <select id="warehouseId" name="warehouseId" value={newShipment.warehouseId} onChange={handleShipmentInputChange} required>
            <option value="">Выберите склад</option>
            {warehouseStore.warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Дата:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newShipment.date}
            onChange={handleShipmentInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Статус:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={newShipment.status}
            onChange={handleShipmentInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productId">Товар:</label>
          <select id="productId" name="productId" value={newShipmentItem.productId} onChange={handleShipmentItemInputChange} required>
            <option value="">Выберите товар</option>
            {productStore.products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Количество:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newShipmentItem.quantity}
            onChange={handleShipmentItemInputChange}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newShipmentItem.price}
            onChange={handleShipmentItemInputChange}
            required
          />
        </div>
        <button type="submit">Добавить поставку</button>
      </form>
    </div>
  );
});

export default ShipmentForm;