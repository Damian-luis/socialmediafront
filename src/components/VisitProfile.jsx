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
    mail:""
  })
  const [post,setPost] = useState(false)
  const [publicacion,setPublicaciones]=useState()
  const getData=async()=>{
    await axios.get(`${process.env.REACT_APP_URL_BACKEND}/users/user/`+id).then(e=>{
          setDataUser({...dataUser,
            name:e.data.dataBasica[0].name,
            lastname:e.data.dataBasica[0].lastname,
            mail:e.data.dataBasica[0].mail
        })
        setPost(e.data.publicacionesUser)
})
  }
  useEffect(()=>{
    getData()
  })
    return <>
    <div className={styles.app}>
      <Sidebar/>

   
   <div className={styles.containerPrincipal}>
   
   <div className={styles.nombre}>
    <h1>{dataUser.name.length>0&&dataUser.name} {dataUser.lastname.length>0&&dataUser.lastname}</h1>
   </div>
   <span className={styles.nombreUsuario}>Publicaciones de {dataUser.name.length>0&&dataUser.name} {dataUser.lastname.length>0&&dataUser.lastname}</span>
  <div className={styles.posts}>
   
    {post && post.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido}/>})}
  </div>
   </div>
    </div>
  </>
}