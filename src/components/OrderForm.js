import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import {Context} from "../index";


const OrderForm = observer(function OrderForm() {
  const { orderStore, customerStore, warehouseStore, employeeStore, orderItemStore, orderTypeStore, productStore } = useContext(Context);
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    warehouseId: '',
    employeeId: '',
    orderTypeId: '',
    date: '',
    status: '',
  });
  const [newOrderItem, setNewOrderItem] = useState({
    productId: '',
    quantity: 0,
    price: 0,
  });

  const handleOrderInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleOrderItemInputChange = (e) => {
    setNewOrderItem({ ...newOrderItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = await orderStore.createOrder(newOrder);
    await orderItemStore.createOrderItem({ ...newOrderItem, orderId: order.id });
    setNewOrder({
      customerId: '',
      warehouseId: '',
      employeeId: '',
      orderTypeId: '',
      date: '',
      status: '',
    });
    setNewOrderItem({
      productId: '',
      quantity: 0,
      price: 0,
    });
  };

  return (
    <div className="form-container">
      <h2>Добавить заказ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Заказчик:</label>
          <select id="customerId" name="customerId" value={newOrder.customerId} onChange={handleOrderInputChange} required>
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
          <select id="warehouseId" name="warehouseId" value={newOrder.warehouseId} onChange={handleOrderInputChange} required>
            <option value="">Выберите склад</option>
            {warehouseStore.warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="employeeId">Сотрудник:</label>
          <select id="employeeId" name="employeeId" value={newOrder.employeeId} onChange={handleOrderInputChange} required>
            <option value="">Выберите сотрудника</option>
            {employeeStore.employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="orderTypeId">Тип заказа:</label>
          <select id="orderTypeId" name="orderTypeId" value={newOrder.orderTypeId} onChange={handleOrderInputChange} required>
            <option value="">Выберите тип товара</option>
            {orderTypeStore.ordertypes.map((ordertype) => (
              <option key={ordertype.id} value={ordertype.id}>
                {ordertype.name}
              </option>
            ))}
          </select>
        </div>
        {/* Аналогичные блоки для складов, сотрудников и типов заказов */}
        <div className="form-group">
          <label htmlFor="productId">Товар:</label>
          <select id="productId" name="productId" value={newOrderItem.productId} onChange={handleOrderItemInputChange} required>
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
            value={newOrderItem.quantity}
            onChange={handleOrderItemInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newOrderItem.price}
            onChange={handleOrderItemInputChange}
            required
          />
        </div>
        <button type="submit">Добавить заказ</button>
      </form>
    </div>
  );
});

export default OrderForm;