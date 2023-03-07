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
export const Sidebar=()=>{
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
        <div className={styles.exitDiv} onClick={logOutHandler}>
        <p className={styles.menuOption}>Cerrar sesion</p> <CgLogOff className={styles.exitLogo}/>
        </div>
    
    </div>
    
    </>
}