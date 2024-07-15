import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import {Context} from "../index";

const CustomerForm = observer(function CustomerForm() {
  const { customerStore } = useContext(Context);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await customerStore.createCustomer(newCustomer);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <div className="form-container">
      <h2>Добавить заказчика</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Добавить заказчика</button>
      </form>
    </div>
  );
});

export default CustomerForm;