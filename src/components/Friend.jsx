import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "../reducers/userSelected/userSelectedSlice";
import { PreviewProfileFriend } from "./PreviewProfileFriend";
import styles from "./Friend.module.css";
import Button from 'react-bootstrap/Button';
export const Friend=(props)=>{
   console.log(props)
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const profileHandler=async(e)=>{
        //e.preventDefault()
        console.log(e.target.value)
        await dispatch(selectUser({id:e.target.value}))
        navigate("/visit-profile")

    }
    return <>
    <div className={styles.card}>

        <div className={styles.name}>
        <h4 className={styles.nombre}>{props.name} {props.lastname}</h4>
        <p>{props.mail}</p>
        </div>
        <div>
        <Button variant="primary" type="submit" value={props.id} onClick={profileHandler}>Ver perfil</Button>
        </div>

    </div>
    </>
}