import React from "react";
import {CgLogOff} from "react-icons/cg"
import {CgProfile} from "react-icons/cg"
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai"
import {FcIdea} from "react-icons/fc"
import styles from "./Sidebar.module.css"
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
import io from 'socket.io-client';
export const Sidebar=()=>{
  const serverUrl = 'http://localhost:3006';
    const socket = io(serverUrl);
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
         sessionStorage.removeItem('userId')
         sessionStorage.removeItem('name')
         dispatch(finishSesion())
         dispatch(finishSession())
         socket.disconnect();
         navigate("/")
    }
    const profileHandler=()=>{
        navigate("/profile")
    }
    const friendsHandler=()=>{
        navigate("/friends")
    }
    const homeHandler=()=>{
        navigate("/home")
    }
    const searchHandler=()=>{
        navigate("/search")
    }
    const infoHandler=()=>{
        navigate("/info")
    }
    return <>
    <div className={styles.sidebar}>
        <div className={styles.menu}>
            <ul>
                <li onClick={homeHandler}><div><p className={styles.menuOption}>Inicio </p></div><div><AiOutlineHome className={styles.menuLogo}/></div></li>
                <li onClick={profileHandler}><div><p className={styles.menuOption}>Perfil</p></div> <div><CgProfile className={styles.menuLogo}/></div></li>
                <li onClick={friendsHandler}><div><p className={styles.menuOption}>Amigos</p></div><div><FaUserFriends className={styles.menuLogo}/></div> </li>
                <li onClick={searchHandler}><div><p className={styles.menuOption}>Buscar</p></div> <div><AiOutlineSearch className={styles.menuLogo}/></div></li>
                <li onClick={infoHandler}><div><p className={styles.menuOption}>Informacion</p></div> <div><FcIdea className={styles.menuLogo}/></div></li>
            </ul>
        </div>
        <div
        style={{
            alignSelf:"center",
            color:"white",
            margin:"10px"
        }}
        >
            {weatherData?<div>
                <div style={{
                    justifyContent:""
                }}>{weatherData.current.temp_c}<img src={weatherData.current.condition.icon}/></div>
                <div>{weatherData.location.name}, {weatherData.location.country}</div><div/></div>
                :<p>No has dado acceso a tu ubicacion</p>}
        </div>
        <div className={styles.exitDiv} onClick={logOutHandler}>
        <p className={styles.menuOption}>Cerrar sesion</p> <CgLogOff className={styles.exitLogo}/>
        </div>
    
    </div>
    
    </>
}