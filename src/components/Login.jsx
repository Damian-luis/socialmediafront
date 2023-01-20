import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useSelector,useDispatch} from "react-redux"
import { addSesion } from "../reducers/users/usersSilce";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import axios from "axios"
export const Login=()=>{
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [user,setUser]=useState({
        mail:"",
        password:""
    })
    const [error,setError]=useState(false)
    const mailHandler=(e)=>{
    setUser({...user,mail:e.target.value})
    }
    const passwordHandler=(e)=>{
        setUser({...user,password:e.target.value})
        }
    const submitHandler=async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:4000/users/login",user).then(e=>{
            dispatch(addSesion({
                mail:user.mail,
                password:user.password,
                isLoggedIn:true
            }))
            setUser({
                mail:"",
                password:""
            })
            navigate("/home")
        }).catch(e=>{setError(e.response.data.message)});
        
        
    }
    const mail=useSelector(state=>state.user.mail)
    return <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Ingresar correo" onChange={mailHandler} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresar contraseña" onChange={passwordHandler}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
      {error}
    </Form>
    </div>
        </div>
}

/**/