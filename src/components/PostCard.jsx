import React from "react";
import styles from "./PostCard.module.css";
export const PostCard=(props)=>{
    console.log(props)
    return <>
    <div className={styles.card}>
        <div className={styles.nombre}>
            <h4>{props.nombre} {props.apellido}</h4>
        </div>
        <div className={styles.publicacion}>
            <p>{props.publicacion}</p>
        </div>
    </div>
    </>
}