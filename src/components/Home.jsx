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
import { addSesion } from "../reducers/users/usersSilce";
import SpinnerComponent  from "./Spinner"
import useGetUserData from "../helpers/useGetUserData";
export const Home=()=>{
  const isLogged=localStorage.getItem('logged')
  
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id =localStorage.getItem('id')
    
    const mail=localStorage.getItem('mail')
    const friendsPosts = useSelector(state=>state.data.publicacionesAmigos)
 
    const getData = async() =>{
      try{
        const userData=await axios.get(`${process.env.REACT_APP_URL_BACKEND}/users/getUserData/`+id).then(e=>{
           
          dispatch(addSesion({
            mail:e.data.user[0].mail,
            password:e.data.user[0].password,
            isLoggedIn:true,
            name:e.data.user[0].name,
            lastname:e.data.user[0].lastname,
            id:e.data.user[0].id,
            date:e.data.user[0].date,
            time:e.data.user[0].time,
            country:e.data.user[0].country, 
            liveCountry:e.data.user[0].liveCountry,
            birthday:e.data.user[0].birthday,
            ocupation:e.data.user[0].ocupation,
            urlProfile:e.data.user[0].urlProfile
        }))
        })

        /*
        const allPosts=await axios.get(`${process.env.REACT_APP_URL_BACKEND}/posts/allPosts/`+id).then(e=>{
          
          dispatch(getPostData({
            misPublicaciones:e.data.misPublicaciones,
            publicacionesAmigos:e.data.publicacionesAmigos
        }))
        })*/

      }
        catch(e){
          console.log(e)
        }
      
      
      
    }
    useGetUserData(id)
    
    useEffect(() =>{
      
      getData()
      
    },[])
    return (
        
        <div className={styles.containerPrincipal}>
   <CreatePost/>
   
   {friendsPosts.length>0?friendsPosts.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} id={e.idUser} date={e.date} time={e.time} like={e.like} usersComments={e.usersComments} usersLinked={e.usersLinked} idPublicacion={e.idPublicacion} urlProfile={e.urlProfile}  />})
   :
   <SpinnerComponent/>
   }
  </div>


       
   
    )
    
  
}
