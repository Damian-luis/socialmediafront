import React from "react";
import {CgLogOff} from "react-icons/cg"
import {CgProfile} from "react-icons/cg"
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai"
import {FcIdea} from "react-icons/fc"
import styles from "./SidebarOptional.module.css"
import {useSelector,useDispatch} from "react-redux"
import { finishSesion } from "../reducers/users/usersSilce";
import { finishSession } from "../reducers/data/dataSlice";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
export const SidebarOptional=()=>{

  const requestOptions = {
    method: 'GET', // Puedes cambiar a 'POST', 'PUT', etc., según tu endpoint
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':"x1vPCqLL7f7podkB8Tc2O5B1ybN79A2mikHRe7nd",
    },
  };
  
  fetch("https://json.freeastrologyapi.com/", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Manejar la respuesta JSON
     // console.log(data);
    })
    .catch(error => {
      // Manejar errores
      //console.error('Error:', error);
    });


    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentLocation();
        const weatherData = await getWeatherData(position.coords.latitude, position.coords.longitude);

        setWeatherData(weatherData);
      } catch (error) {
        setError('No se ha podido acceder a su ubicación o recuperar datos meteorológicos.')
      }
    };

    fetchData();
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeatherData = async (latitude, longitude) => {
    const apiKey = '53eee8bc85174a5bb1e155518240802';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    const response = await axios.get(apiUrl);
    
    return response.data;
  };


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler=async(e)=>{
        e.preventDefault()
        localStorage.removeItem('logged')
         localStorage.removeItem('id')
         localStorage.removeItem('mail')
         localStorage.removeItem('name')
         localStorage.removeItem('lastname')
         localStorage.removeItem('urlProfile')
         dispatch(finishSesion())
         dispatch(finishSession())
         navigate("/")
    }
    const calendarHandler=()=>{
        navigate("/calendar")
    }
    const storeHandler=()=>{
        navigate("/store")
    }
    const newsHandler=()=>{
        navigate("/news")
    }
    return <>
    
    <div className={styles.sidebar}>
        <div className={styles.menu}>
            <ul>
                <li onClick={newsHandler}><div><p className={styles.menuOption}>Noticias </p></div><div><FaRegNewspaper className={styles.menuLogo}/></div></li>
                <li onClick={calendarHandler}><div><p className={styles.menuOption}>Calendario</p></div> <div><FaRegCalendarAlt className={styles.menuLogo}/></div></li>
                <li onClick={storeHandler}><div><p className={styles.menuOption}>Tienda</p></div><div><FaStore className={styles.menuLogo}/></div> </li>
                
            </ul>
        </div>
        
        
    
    </div>
            
    </>
}