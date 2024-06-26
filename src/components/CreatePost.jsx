import React from "react";
import styles from "./CreatePost.module.css";
import Button from 'react-bootstrap/Button';
import {useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import { addPostData } from "../reducers/data/dataSlice";
import { ToastContainer, toast } from 'react-toastify';
import useGetUserData from "../helpers/useGetUserData";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios" 
import Avatar from '@mui/material/Avatar';
export const CreatePost=()=>{  
    
    const name =sessionStorage.getItem("name");
    const lastname =sessionStorage.getItem("lastname");
    const id =sessionStorage.getItem('userId')
    const urlProfile =sessionStorage.getItem('urlProfile')
    const dispatch=useDispatch()
    const [post,setPost]=useState({publicacion:""})
    const postHanlder=(e)=>{
        setPost({...post,publicacion:e.target.value})
    }
    /*const dataaa=useGetUserData("QnQUhTGp5ELwlkSa8O9G").then(e=>{
        dispatch(addPostData(e))
    })
    console.log(dataaa)*/
    const sendPost=async(e)=>{
        e.preventDefault()
        
       /*dispatch(addPostData({
            nombre:name,
            apellido:lastname,
            id,
            publicacion:post.publicacion
        }))*/
        
        await axios.post(`${process.env.REACT_APP_URL_BACKEND}/posts/addPost/${name}/${lastname}/${id}`,post)
        .then(e=>{
            
            if(e.data.status===true){
                toast.info(`${e.data.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                    });
                    
            }
            else{
                toast.error(`${e.data.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

        })
        setPost({publicacion:""})
        
    }
    
    return <>
    <div className={styles.formContainer}>
        <div className={styles.formContainerLeft}>
        <Avatar alt="Imagen de perfil" src={urlProfile} style={{
            width:"60px",height:"60px"
        }}>
            {urlProfile ? undefined : `${name.charAt(0)}${lastname.charAt(0)}`}
          </Avatar>
        
        </div>
        <div className={styles.formContainerRight}>
    <form className={styles.form} onSubmit={sendPost}>
        <input placeholder="Hay alguna novedad?" onChange={postHanlder} value={post.publicacion}/>
        <Button variant="primary" type="submit">
       Publicar
       <ToastContainer toastStyle={{ backgroundColor: "rgb(11, 56, 180)",color:"white" }}/>
      </Button>
    </form>
    </div>
    </div>
    </>
}
