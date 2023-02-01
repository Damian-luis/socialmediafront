import React from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "../reducers/userSelected/userSelectedSlice";
import styles from "./PostCard.module.css";
export const PostCard=(props)=>{
 
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const profileHandler=async(e)=>{
        e.preventDefault()
        dispatch(selectUser({id:props.id}))
        navigate("/visit-profile")

    }
    return <>
    <div className={styles.card}>
        <div className={styles.nombre} onClick={profileHandler}>
            <h4>{props.nombre} {props.apellido}</h4>
            <span>{props.date} {props.time}</span>
        </div>
        <div className={styles.publicacion}>
            <p>{props.publicacion}</p>
        </div>
    </div>
    </>
}