import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./Profile.module.css";
import { PostCard } from "./PostCard";
import { useSelector,useDispatch } from "react-redux";
export const Profile=()=>{
  const myPosts = useSelector(state=>state.data.misPublicaciones)
    return <>
    <div className={styles.app}>
      <Sidebar/>

   
   <div className={styles.containerPrincipal}>
   {myPosts.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido}/>})}
  
   </div>
    </div>
  </>
}