import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useSelector,useDispatch} from "react-redux"
import { addSesion } from "../reducers/users/usersSilce";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AiFillEye} from "react-icons/ai";
import styles from "./Login.module.css"
import axios from "axios"
import InputGroup from 'react-bootstrap/InputGroup';
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
        await axios.post(`${process.env.REACT_APP_URL_BACKEND}/users/login`,user).then(e=>{
          
            dispatch(addSesion({
                mail:e.data.user[0].mail,
                password:e.data.user[0].password,
                isLoggedIn:true,
                name:e.data.user[0].name,
                lastname:e.data.user[0].lastname,
                id:e.data.user[0].id,
                date:e.data.user[0].mail,
                time:e.data.user[0].time  
            }))
           setUser({
                mail:"",
                password:""
            })
            navigate("/home")
        }).catch(e=>{
          
          setError(e.response.data.message)
        });
        
    }
    const [checkPassword,setCheckPassword]=useState(false)
    const seePassword=()=>{
setCheckPassword(!checkPassword)
    }
    
    const mail=useSelector(state=>state.user.mail)
    return <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form onSubmit={submitHandler} className={styles.form}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Ingresar correo" onChange={mailHandler} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">

        <Form.Label>Contraseña</Form.Label>
        <InputGroup size="sm" className="mb-3">
        <Form.Control type={checkPassword===true?"password":"text"} placeholder="Ingresar contraseña" onChange={passwordHandler}/><AiFillEye onClick={seePassword}/></InputGroup>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
      {error}
      <div className={styles.register}>
    <p>Aun no tienes una cuenta? <Link to="/register">Registrate</Link></p>
    </div>
    </Form>
    
    
    </div>
        </div>
}

/**/