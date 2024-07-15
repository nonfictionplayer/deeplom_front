import React, {useContext, useEffect,useState} from 'react';
import {Button,Container, Image,} from "react-bootstrap";
import './style.css'
import {useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import {Context} from "../index";

const ShipmentPage = observer(() => {
    const {shipment} = useContext(Context)
    
    const {id} = useParams()
    useEffect(() => {
        shipment.fetchShipment(id)
        
    }, [shipment, id])
    console.log(shipment)
    
    
    return (
        <Container className="mt-3">
            <div>
                <h2>{shipment.currentShipment.name}</h2>
                <div className='d-flex mt-4'>
                    <div >
                        <h3>Информация о поставке</h3>
                        <div className='cardSyyle2'>
                            <h3 >Сумма поставки: {shipment.currentShipment.price}₽</h3>
                            <div >Дата поставки: {shipment.currentShipment.date}</div>
                            <div >Статус: {shipment.currentShipment.status}</div>
                            <div >Адрес склада: {shipment.currentShipment.warehouse?.address}</div>
                            <div>Количество в поставке: {shipment.currentShipment.count}</div>
                            <div>Товары в поставке:</div>
                            {shipment.currentShipment.shipmentItems.map((shipmentItem) => (
                                <div key={shipmentItem.id} className='minicardStyle'>
                                    <div>Название товара: {shipmentItem.product?.name}</div>
                                    <div>Количество товара: {shipmentItem.count}</div>
                                    <div>Сумма товара в заказе:{shipmentItem.count * shipmentItem.product?.price}</div>
                                </div>
                            ))}
                            <button onClick={() => shipment.deleteShipment(shipment.id)}>
                            Удалить
                            </button>
                            <button onClick={() => shipment.fetchShipment(shipment.id)}>
                                Редактировать
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </Container>
    );
});

export default ShipmentPage;