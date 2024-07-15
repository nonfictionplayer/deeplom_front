import React, {useContext, useEffect,useState} from 'react';
import {Button,Container, Image,} from "react-bootstrap";
import './style.css'
import {useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import {Context} from "../index";

const OrderPage = observer(() => {
    const {order} = useContext(Context)
    
    const {id} = useParams()
    useEffect(() => {
        order.fetchOrder(id)
    }, [order, id])
    console.log(order)
    

    return (
        <Container className="mt-3">
            <div>
                <h2>{order.currentOrder.name}</h2>
                <div className='d-flex mt-4'>
                    <div >
                        <h3>Информация о товаре</h3>
                        <div className='cardSyyle2'>
                            <h3 >Стоимость заказа: {order.currentOrder.price}₽</h3>
                            <div>Регион доставки: {order.currentOrder.regionDelivery}</div>
                            <div>Стоймость доставки: {order.currentOrder.deliveryPrice}</div>
                            <div>Дата оформления: {order.currentOrder.orderDate}</div>
                            <div>Дата оформления: {order.currentOrder.deliveryDate}</div>
                            <div>Клиент: {order.currentOrder.customer?.name}</div>
                            <div>Статус: {order.currentOrder.status}</div>
                            <div>Склад: {order.currentOrder.warehouse?.address}</div>
                            <div>Тип заказа: {order.currentOrder.orderType?.name}</div>
                            <div>Количество в заказе: {order.currentOrder.count}</div>
                            <div>Товары в заказе:</div>
                            {order.currentOrder.orderItems.map((orderItem) => (
                                <div key={orderItem.id} className='minicardStyle'>
                                    <div>Название товара: {orderItem.product?.name}</div>
                                    <div>Количество товара: {orderItem.count}</div>
                                    <div>Сумма товара в заказе:{orderItem.count * orderItem.product?.price}</div>
                                </div>
                            ))}
                             <button onClick={() => order.deleteOrder(order.id)}>
                            Удалить
                            </button>
                            <button onClick={() => order.fetchOrder(order.id)}>
                                Редактировать
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </Container>
    );
});

export default OrderPage;