import React from "react";
import {CgLogOff} from "react-icons/cg"
import styles from "./Sidebar.module.css"
import {useSelector,useDispatch} from "react-redux"
import { finishSesion } from "../reducers/users/usersSilce";
import {useNavigate} from "react-router-dom"
export const Sidebar=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler=(e)=>{
        e.preventDefault()
        dispatch(finishSesion())
        navigate("/")
    }
    return <>
    <div className={styles.sidebar}>
        <div className={styles.exitDiv} onClick={logOutHandler}>
        Cerrar sesion <CgLogOff className={styles.exitLogo}/>
        </div>
    
    </div>
    
    </>
}