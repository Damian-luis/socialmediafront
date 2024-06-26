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
import computer from "../assets/computer.png"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import io from 'socket.io-client';
export const Login=()=>{
  const serverUrl = 'http://localhost:3006';
      const socket = io(serverUrl);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
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
        if (!user.mail || !user.password) {
          setShowAlert(true);
          return;
        }
      
        try {
          setLoading(true); 
    
          await axios.post(`${process.env.REACT_APP_URL_BACKEND}/users/login`, user).then(e => {

            
      socket.emit('join', { idUser: e.data.user[0].id, name: e.data.user[0].name });



            socket.on('ping', () => {
              socket.emit('pong'); 
            })
            localStorage.setItem('name', e.data.user[0].name);
            localStorage.setItem('lastname', e.data.user[0].lastname);
            localStorage.setItem('mail', e.data.user[0].mail);
            localStorage.setItem('logged', true);
            localStorage.setItem('id', e.data.user[0].id);
            localStorage.setItem('urlProfile', e.data.user[0].urlProfile);
            sessionStorage.setItem('userId', e.data.user[0].id);
            sessionStorage.setItem('name', e.data.user[0].name);
            sessionStorage.setItem('lastname', e.data.user[0].lastname)
            sessionStorage.setItem('urlProfile', e.data.user[0].urlProfile)
            setUser({
              mail: "",
              password: ""
            });
            navigate("/home");
          }).catch(e => {
            setError(e.response.data.message);
          });
        } catch (error) {
          //setError(error.response.data.message);
        } finally {
          setLoading(false);
        }
        
        
    }
    const [checkPassword,setCheckPassword]=useState(true)
    const seePassword=()=>{
setCheckPassword(!checkPassword)
    }
    
    const mail=useSelector(state=>state.user.mail)
    return <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.img}>
          <img src={computer}></img>
        </div>
      </div> 
      {loading && (
  <Backdrop open={loading} className={styles.backdrop}>
    <div className={styles.loadingContainer}>
      <CircularProgress />
    </div>
  </Backdrop>
)}
      <div className={styles.formContainer}>
        <div className={styles.introducing}>
          <h4>Comparte, comenta y disfruta con tus amigos</h4>
        </div>
        <form onSubmit={submitHandler} className={styles.form}>
      
        <label>Correo electrónico</label>
        <input type="email" placeholder="Ingresar correo" onChange={mailHandler} />
       
        <label>Contraseña</label>
        <div className={styles.passwordInput}><input type={checkPassword===true?"password":"text"} placeholder="Ingresar contraseña" onChange={passwordHandler}></input><span><AiFillEye onClick={seePassword} className={styles.seePassword}/></span></div>
        
      
      
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
                  <Snackbar
              open={showAlert}
              autoHideDuration={6000}
              onClose={() => setShowAlert(false)}
            >
              <Alert onClose={() => setShowAlert(false)} severity="error">
                Por favor, ingresa un correo y una contraseña.
              </Alert>
            </Snackbar>

      <div className={styles.register}>
    <p>Aun no tienes una cuenta? <Link to="/register">Registrate</Link></p>
    </div>
    </form>
    
    
    </div>
   
        </div>
}

/**/