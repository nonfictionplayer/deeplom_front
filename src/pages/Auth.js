import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Container from 'react-bootstrap/esm/Container';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {MAIN_ROUTE,REG_ROUTE,LOGIN_ROUTE} from "../utils/consts";
import './style.css'
import { login, registration } from '../http/employeeAPI';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const Auth = observer(() => {
    const {employee} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const history = useNavigate()

    const click = async () => {
      try{
        let data = undefined;
        if (isLogin) {
            data = await login(email, password);
        } else {
            data = await registration(email, password);
        }
        console.log(data)
        if (data) {
            await employee.setUser(data);
            employee.setAuth(true);
            history(MAIN_ROUTE);
        }
    
    } catch (e) {
        alert(e.response.data.message)
    }
        
    };

    return (
      <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
      >
      <Card style={{width: 600}} className="p-5">
          <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
          <Form className="d-flex flex-column">
              <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш логин"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
              <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш пароль..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                  <Row className="d-flex  ">
                      
                  
                  </Row>
                  <Button
                      variant={"outline-success"}
                      onClick={click}
                  >
                      {isLogin ? 'Войти' : 'Регистрация'}
                  </Button>
              </div>
              
          </Form>
      </Card>
  </Container>
  );
});



export default Auth