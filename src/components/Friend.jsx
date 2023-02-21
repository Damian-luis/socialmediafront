import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "../reducers/userSelected/userSelectedSlice";
import { PreviewProfileFriend } from "./PreviewProfileFriend";
import styles from "./Friend.module.css";
import Button from 'react-bootstrap/Button';
import axios from "axios";
export const Friend=(props)=>{
    const id=localStorage.getItem("id")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const followHandler=async(e)=>{
       e.preventDefault()
       try{
        await axios.post(`${process.env.REACT_APP_URL_BACKEND}/relationships/addFollow/${id}/${props.id}/${props.name}/${props.lastname}/${props.mail}`).then(e=>{
            alert(e.data.message)
           })
       }
       catch(e){
        console.log(e)
       }
       
    }
    const profileHandler=async(e)=>{ 
        //e.preventDefault()
        
        await dispatch(selectUser({id:e.target.value}))
        navigate("/visit-profile")

    }
    return <>
    <div className={styles.card}>

        <div className={styles.name}>
        <h4 className={styles.nombre}>{props.name} {props.lastname}</h4>
        <p>{props.mail}</p>
        </div>
        <div className={styles.cardFriend}>
        <Button variant="primary" type="submit" value={props.id} onClick={profileHandler}>Ver perfil</Button>
        <Button variant="primary" type="submit" value={props.id} onClick={followHandler}>Seguir usuario</Button>
        </div>

    </div>
    </>
}