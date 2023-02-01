import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./Profile.module.css";
import { PostCardEdit } from "./PostCardEdit";
import { useSelector,useDispatch } from "react-redux";
export const Profile=()=>{
  const myPosts = useSelector(state=>state.data.misPublicaciones)
    return <>
    <div className={styles.app}>
      <Sidebar/>

   
   <div className={styles.containerPrincipal}>
   {myPosts.map(e=>{return <PostCardEdit publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} idPublicacion={e.idPublicacion} date={e.date} time={e.time}/>})}
  
   </div>
    </div>
  </>
}