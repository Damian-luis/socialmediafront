import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css"
import axios from "axios"
export const Register=()=>{
    const navigate=useNavigate()
    const [user,setUser]=useState({
        mail:"",
        password:"",
        name:"",
        lastname:""
    })
    const [error,setError]=useState(false)
    const nameHandler=(e)=>{
        setUser({...user,name:e.target.value})
        }
        const lastnameHandler=(e)=>{
            setUser({...user,lastname:e.target.value})
            }
    const mailHandler=(e)=>{
    setUser({...user,mail:e.target.value})
    }
    const passwordHandler=(e)=>{
        setUser({...user,password:e.target.value})
        }
    const submitHandler=async(e)=>{
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_URL_BACKEND}/users/addUser`,user).then(e=>{
          console.log(e.data)
            
           setUser({
                mail:"",
                password:"",
                name:"",
                lastname:""
            })
alert(e.data.message)
            navigate("/")
        }).catch(e=>{
          console.log(e.response.data.message)
          setError(e.response.data.message)
        });
        
    }
    console.log("login rendered")
    return <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form onSubmit={submitHandler} className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu nombre" onChange={nameHandler} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ingresar tu apellido" onChange={lastnameHandler} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
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
        Registrarse
      </Button>
      {error}
    </Form>
    </div>
        </div>
}