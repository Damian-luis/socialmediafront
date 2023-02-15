import React from "react";
import styles from "./CreatePost.module.css";
import Button from 'react-bootstrap/Button';
import {useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import { addPostData } from "../reducers/data/dataSlice";
import axios from "axios"
export const CreatePost=()=>{
    const name =useSelector(state=>state.user.name)
    const lastname =useSelector(state=>state.user.lastname)
    const id =useSelector(state=>state.user.id)
    const dispatch=useDispatch()
    const [post,setPost]=useState({publicacion:""})
    const postHanlder=(e)=>{
        setPost({...post,publicacion:e.target.value})
    }
    const sendPost=async(e)=>{
        e.preventDefault()
        console.log(post)
        dispatch(addPostData({
            nombre:name,
            apellido:lastname,
            id,
            publicacion:post.publicacion
        }))
        await axios.post(`${process.env.REACT_APP_URL_BACKEND}/posts/addPost/${name}/${lastname}/${id}`,post)
        .then(e=>{alert(e.data.message)})
        setPost({publicacion:""})
    }
    
    return <>
    <div className={styles.formContainer}>
        <div className={styles.formContainerLeft}>
        <img src="https://www.seekpng.com/png/full/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png" className={styles.picture}></img>
        </div>
        <div className={styles.formContainerRight}>
    <form className={styles.form} onSubmit={sendPost}>
        <input placeholder="Hay alguna novedad?" onChange={postHanlder} value={post.publicacion}/>
        <Button variant="primary" type="submit">
       Publicar
      </Button>
    </form>
    </div>
    </div>
    </>
}
