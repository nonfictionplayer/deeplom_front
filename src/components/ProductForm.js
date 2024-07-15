import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import {Context} from "../index";

const ProductForm = observer(function ProductForm() {
  const { productStore, warehouseStore } = useContext(Context);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    count: 0,
    price: 0,
    warehouseId: '',
  });

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await productStore.createProduct(newProduct);
    setNewProduct({ name: '', description: '', count: 0, price: 0, warehouseId: '' });
  };

  return (
    <div className="form-container">
      <h2>Добавить товар</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="count">Количество:</label>
          <input
            type="number"
            id="count"
            name="count"
            value={newProduct.count}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="warehouseId">Склад:</label>
          <select id="warehouseId" name="warehouseId" value={newProduct.warehouseId} onChange={handleInputChange} required>
            <option value="">Выберите склад</option>
            {warehouseStore.warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Добавить товар</button>
      </form>
    </div>
  );
});

export default ProductForm;