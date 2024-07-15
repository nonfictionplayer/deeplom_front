import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect,useState} from 'react';
import Container from 'react-bootstrap/esm/Container';
import { fetchWarehouse } from '../http/warehouseAPI';
import {Context} from "../index";
import './style.css'
import { SHIPMENT_ROUTE, ORDER_ROUTE} from '../utils/consts';
import {useNavigate} from "react-router-dom"


const MainPage = observer(() => {

    const navigate = useNavigate()
    const {employee} = useContext(Context)
    const {product} = useContext(Context)
    const {order} = useContext(Context)
    const {customer} = useContext(Context)
    const {warehouse} = useContext(Context)
    const {shipment} = useContext(Context)

    const {orderItem} = useContext(Context)
    const {shipmentStore} = useContext(Context)


    useEffect(() => {
        product.fetchProducts();
        customer.fetchCustomers();
        warehouse.fetchWarehouses();
        employee.fetchEmployees();
        shipment.fetchShipments();
        order.fetchOrders();
        
      }, [product, customer, warehouse, employee, shipment, order]);

      
    
    return (
        <Container className='mt-4'>
             <div className='cardSyyle'>
                <h2>Склад</h2>
                <div>
                {warehouse.warehouses.map((warehouse) => (
                <div key={warehouse.id} >
                    <div >Адрес: {warehouse.address}</div>
                    <div >Резерв в количестве: {warehouse.reservCount}</div>
                    <div >Резерв в рублях: {warehouse.reservPrice}</div>
                   
                </div>
                ))}
                </div>
            </div>
            <div className='d-flex justify-content-between mt-2'>
            <div className='cardSyyle1'>
                <h2>Список поставок</h2>
                <div >
                {shipment.shipments.map((shipment) => (
                    <div key={shipment.id} className='minicardStyle' onClick={() => navigate(SHIPMENT_ROUTE + '/' + shipment.id)} >
                       
                        <div >Название: {shipment.name}</div>
                        <div >Дата поставки: {shipment.date}</div>
                        <div >Статус: {shipment.status}</div>
                        <div >Адрес склада: {shipment.warehouse?.address}</div>
                        <div>Количество в поставке: {shipment.count}</div>
                        <div>Сумма поставки: {shipment.price}</div>
                        <div >
                        
                        <button onClick={() => shipment.deleteShipment(shipment.id)}>
                            Удалить
                        </button>
                        <button onClick={() => shipment.fetchShipment(shipment.id)}>
                            Редактировать
                        </button>
                    </div>
                    
                    </div>
                ))}
                </div>
                
            </div>
            <div className='cardSyyle1'> 
                <h2>Список заказов</h2>
                <div >
                {order.orders.map((order) => (
                    <div
                        key={order.id}
                        className="minicardStyle"
                        onClick={() => navigate(ORDER_ROUTE + '/' + order.id)}
                    >
                        <div>Название: {order.name}</div>
                        <div>Регион доставки: {order.regionDelivery}</div>
                        <div>Стоймость доставки: {order.deliveryPrice}</div>
                        <div>Дата оформления: {order.orderDate}</div>
                        <div>Дата оформления: {order.deliveryDate}</div>
                        <div>Клиент: {order.customer?.name}</div>
                        <div>Статус: {order.status}</div>
                        <div>Склад: {order.warehouse?.address}</div>
                        <div>Тип заказа: {order.orderType?.name}</div>
                        <div>Количество в заказе: {order.count}</div>
                        <div>Стоимость в заказе: {order.price}</div>
                        
                        <div>
                        <button onClick={() => order.deleteOrder(order.id)}>
                            Удалить
                        </button>
                        <button onClick={() => order.fetchOrder(product.id)}>
                            Редактировать
                        </button>
                        </div>
                        <div>
                        
                        </div>
                    </div>
                    ))}
                </div>
                
                
            </div>
           
            <div className='cardSyyle1'>

            <div>
                <h2>Список продуктов</h2>
                <div className="">
                    {product.products.map((product) => (
                    <div key={product.id} className="minicardStyle">
                        
                        <div >Наименование: {product.name}</div>
                        <div >Описание: {product.description}</div>
                        <div >Количество: {product.count}</div>
                        <div >Цена: {product.price}</div>
                        <div >
                        <button onClick={() => product.deleteProduct(product.id)}>
                            Удалить
                        </button>
                        <button onClick={() => product.fetchProduct(product.id)}>
                            Редактировать
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                            
            </div>
            </div>
            <div className='cardSyyle mt-2'>
            <h2>Список сотрудников</h2>
            <div>
                {employee.employees.map((employee) => (
                    <div key={employee.id} className="minicardStyle">
                        <div>Имя: {employee.name}</div>
                        <div>Должность: {employee.role}</div>
                        <button onClick={() => customer.deleteEmployee(employee.id)}>
                        Удалить
                    </button>
                    <button onClick={() => customer.fetchEmployee(employee.id)}>
                        Редактировать
                    </button>
                    </div>
                ))}
            </div>
            </div>
            <div className='cardSyyle mt-2'>
            <h2>Список клиентов</h2>
                <div>
                {customer.customers.map((customer) => (
                <div key={customer.id} className="minicardStyle">
                    <div >Название: {customer.name}</div>
                    <div >Телефон{customer.phone}</div>
                    <div >Адрес: {customer.address}</div>
                    <div >
                    <button onClick={() => customer.deleteCustomer(customer.id)}>
                        Удалить
                    </button>
                    <button onClick={() => customer.fetchCustomer(customer.id)}>
                        Редактировать
                    </button>
                    </div>
                </div>
            ))}
                </div>
                
            </div>
        </Container>
    );
});

export default MainPage;