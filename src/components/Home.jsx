import React from "react";
import { useSelector,useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";
import {Sidebar} from "./Sidebar"
import { CreatePost } from "./CreatePost";
import {AiOutlineBars} from "react-icons/ai";
import styles from "./Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { getPostData } from "../reducers/data/dataSlice";
import { PostCard } from "./PostCard";
import { Layout } from "../layout/layout";
export const Home=()=>{
  const isLogged=localStorage.getItem('logged')
  console.log(isLogged)
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id =localStorage.getItem('id')
    
    const mail=useSelector(state=>state.user.mail)
    const friendsPosts = useSelector(state=>state.data.publicacionesAmigos)
   
    const getData = async() =>{
      const allPosts=await axios.get(`${process.env.REACT_APP_URL_BACKEND}/posts/allPosts/`+id).then(e=>{
        
        dispatch(getPostData({
          misPublicaciones:e.data.misPublicaciones,
          publicacionesAmigos:e.data.publicacionesAmigos
      }))
      })
      
    }
    useEffect(() =>{
      
      getData()
      
    },[])
    return (
        
        <div className={styles.containerPrincipal}>
   <CreatePost/>
   
   {friendsPosts.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} id={e.idUser} date={e.date} time={e.time} like={e.like} usersComments={e.usersComments} usersLinked={e.usersLinked} idPublicacion={e.idPublicacion}/>})}
  </div>


       
   
    )
    
  
}
{/*}>
   */}