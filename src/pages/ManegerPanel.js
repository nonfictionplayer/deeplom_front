import React, {useState} from 'react';
import Container from 'react-bootstrap/esm/Container';
import EmployeeForm from '../components/EmployeeForm';
import CustomerForm from '../components/CustomerForm';
import OrderForm from '../components/OrderForm';
import ShipmentForm from '../components/ShipmentForm';
import ProductForm from '../components/ProductForm';
import { observer } from 'mobx-react-lite';


const AdminPage = observer(function AdminPage() {
    const [activeForm, setActiveForm] = useState();
  
    const handleFormSelect = (form) => {
      setActiveForm(form);
    };
  
    return (
        <Container>
      <div className="admin-page">
        <div className="form-selector">
          <button
            className={activeForm === 'employee' ? 'active' : ''}
            onClick={() => handleFormSelect('employee')}
          >
            Сотрудник
          </button>
          <button
            className={activeForm === 'customer' ? 'active' : ''}
            onClick={() => handleFormSelect('customer')}
          >
            Заказчик
          </button>
          <button
            className={activeForm === 'order' ? 'active' : ''}
            onClick={() => handleFormSelect('order')}
          >
            Заказ
          </button>
          <button
            className={activeForm === 'shipment' ? 'active' : ''}
            onClick={() => handleFormSelect('shipment')}
          >
            Поставка
          </button>
          <button
            className={activeForm === 'product' ? 'active' : ''}
            onClick={() => handleFormSelect('product')}
          >
            Товар
          </button>
        </div>
        <div className="form-container">
          {activeForm === 'employee' && <EmployeeForm />}
          {activeForm === 'customer' && <CustomerForm />}
          {activeForm === 'order' && <OrderForm />}
          {activeForm === 'shipment' && <ShipmentForm />}
          {activeForm === 'product' && <ProductForm />}
        </div>
      </div>
      </Container>
    );
  });
  
  export default AdminPage;