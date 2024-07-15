import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import {Context} from "../index";

const EmployeeForm = observer(function EmployeeForm() {
  const { employeeStore } = useContext(Context);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await employeeStore.createEmployee(newEmployee);
    setNewEmployee({ name: '', email: '', role: '' });
  };

  return (
    <div className="form-container">
      <h2>Добавить сотрудника</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Телефон:</label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            value={newEmployee.Phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Роль:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={newEmployee.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login">login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={newEmployee.login}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={newEmployee.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Добавить сотрудника</button>
      </form>
    </div>
  );
});

export default EmployeeForm;
