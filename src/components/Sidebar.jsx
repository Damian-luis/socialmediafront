import React from "react";
import {CgLogOff} from "react-icons/cg"
import {CgProfile} from "react-icons/cg"
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai"
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
    return <>
    <div className={styles.sidebar}>
        <div className={styles.menu}>
            <ul>
                <li onClick={homeHandler}>Inicio <AiOutlineHome className={styles.menuLogo}/></li>
                <li onClick={profileHandler}>Perfil <CgProfile className={styles.menuLogo}/></li>
                <li onClick={friendsHandler}>Amigos <FaUserFriends className={styles.menuLogo}/></li>
                <li onClick={searchHandler}>Buscar <AiOutlineSearch className={styles.menuLogo}/></li>
            </ul>
        </div>
        <div className={styles.exitDiv} onClick={logOutHandler}>
        Cerrar sesion <CgLogOff className={styles.exitLogo}/>
        </div>
    
    </div>
    
    </>
}