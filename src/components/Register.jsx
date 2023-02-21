import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Register.module.css"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
export const Register=()=>{
    const navigate=useNavigate()
    const [user,setUser]=useState({
        name:"",
        lastname:"",
        country:"",
        liveCountry:"",
        birthday:"",
        ocupation:"",
        mail:"",
        password:""
    })
    const [error,setError]=useState(false)
    const nameHandler=(e)=>{
        setUser({...user,name:e.target.value})
        }
    const lastnameHandler=(e)=>{
            setUser({...user,lastname:e.target.value})
            }
    const countryHandler=(e)=>{
              setUser({...user,country:e.target.value})
              }
    const liveCountryHandler=(e)=>{
                setUser({...user,liveCountry:e.target.value})
                }
    const birthdayHandler=(e)=>{
                  setUser({...user,birthday:e.target.value})
                  }
    const ocupationHandler=(e)=>{
                    setUser({...user,ocupation:e.target.value})
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
          alert(e.data.message)
            console.log(e.data.message)
           setUser({
            name:"",
            lastname:"",
            country:"",
            liveCountry:"",
            birthday:"",
            ocupation:"",
            mail:"",
            password:""
            })
            
            navigate("/")
        }).catch(e=>{
          
          setError(e.response.data.message)
        });
        
    }
    
    return <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentLeft}><h1>Conecta</h1></div>
        <div className={styles.contentRight}><h1>Comparte</h1></div>
        <div className={styles.contentLeft}><h1>Interactua</h1></div>
        <div className={styles.contentCenter}>Abre un mundo de posibilidades con un solo click</div>
      </div>
      <div className={styles.formContainer}>
      <ToastContainer toastStyle={{ backgroundColor: "rgb(11, 56, 180)",color:"white" }}/>
        <div>
          <h2>Bienvenido!</h2>
          <h4>Crea una cuenta para empezar a disfrutar de nosotros</h4>
        </div>
      <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.formInside}>
      <div>
      
      <input type="text" placeholder="Ingresar nombre" onChange={nameHandler} />
      
      <input type="text" placeholder="Ingresar apellido" onChange={lastnameHandler} />
      </div>
      <div>
      
      <input type="text" placeholder="Pais donde naciste" onChange={countryHandler} />
      
      <input type="text" placeholder="Pais donde vives actualmente" onChange={liveCountryHandler} />
      </div>
      <div>
      <label>Fecha de nacimiento</label>
      <input type="date"  onChange={birthdayHandler} />
      
      <input type="text" placeholder="Ocupacion" onChange={ocupationHandler} />
      </div>
      <div>
     
      <input type="email" placeholder="Ingresar correo" onChange={mailHandler} />
      
      <input type="text" placeholder="Ingresar contraseña" onChange={passwordHandler} />
      </div>
      
    
    
    <Button variant="primary" type="submit">
      Registrarse
    </Button>
    {error}
    
    <div className={styles.register}>
  <p>Ya tienes una cuenta? <span onClick={()=>{navigate("/")}} style={{color:"blue"}}>Inicia sesion</span></p>
  </div>
  </div>
  </form>
  
    </div>
        </div>
}