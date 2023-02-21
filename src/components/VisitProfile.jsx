import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./VisitProfile.module.css";
import { PostCard } from "./PostCard";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useEffect,useState } from "react";
export const VisitProfile=()=>{
  const id = useSelector(state=>state.userSelected.id)
  
  const [dataUser,setDataUser]=useState({
    name:"",
    lastname:"",
    mail:"",
    date:"",
    time:"",
    id:""

  })
  const [post,setPost] = useState([])
  const [publicacion,setPublicaciones]=useState()
  const getData=async()=>{
    await axios.get(`${process.env.REACT_APP_URL_BACKEND}/users/getUserData/`+id).then(e=>{
          setDataUser({...dataUser,
            name:e.data.user[0].name,
            lastname:e.data.user[0].lastname,
            mail:e.data.user[0].mail,
            date:e.data.user[0].date,
            time:e.data.user[0].time,
            id:e.data.user[0].id,
 })
        console.log(e.data)
        setPost(e.data.post)
})
  }
  useEffect(()=>{
    getData()
  },[])
    return <>
    <div className={styles.app}>

   
   <div className={styles.containerPrincipal}>
   
   <div className={styles.nombre}>
    <h1>{dataUser.name} {dataUser.lastname}</h1>
   </div>
   <span className={styles.nombreUsuario}>Publicaciones de {dataUser.name} {dataUser.lastname}</span>
  <div className={styles.posts}>
   
  {post && post.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} id={e.idUser} date={e.date} time={e.time} like={e.like} usersComments={e.usersComments} usersLinked={e.usersLinked} idPublicacion={e.idPublicacion}/>})}
  </div>
   </div>
    </div>
  </>
}