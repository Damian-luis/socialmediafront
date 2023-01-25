import React from "react";
import styles from "./CreatePost.module.css";
import Button from 'react-bootstrap/Button';
import {useState} from "react"
import {useDispatch} from "react-redux"
import axios from "axios"
export const CreatePost=()=>{
    const dispatch=useDispatch()
    const [post,setPost]=useState("")
    const postHanlder=(e)=>{
        setPost(e.target.value)
    }
    const sendPost=(e)=>{
        e.preventDefault()
        dispatch()
    }
    console.log("create post rendered")
    return <>
    <div className={styles.formContainer}>
    <form className={styles.form} onSubmit={sendPost}>
        <input placeholder="Hay alguna novedad?" onChange={postHanlder}/>
        <Button variant="primary" type="submit">
       Publicar
      </Button>
    </form>
    </div>
    </>
}
