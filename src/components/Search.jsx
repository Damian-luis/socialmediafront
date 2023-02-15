import styles from "./Search.module.css";
import React from "react";
import {Sidebar} from "./Sidebar"
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { Friend } from "./Friend";
import axios from "axios"
import { PostCardEdit } from "./PostCardEdit";
export const Search=()=>{
  const id = useSelector(state=>state.user.id)

  const [friends,setFriends]=useState(null)
  const [noFriends,setNoFriends]=useState(null)
  const getFriends=async()=>{
      axios.get(`${process.env.REACT_APP_URL_BACKEND}/relationships/allFollows/`+id).then((e)=>{
      
        setFriends(e.data.friends)
        setNoFriends(e.data.noFriends)
      })
  }
  useEffect(()=>{
    getFriends()
  },[])
    return <>
    <div className={styles.app}>
      {/*<Sidebar/>*/}

   
   <div className={styles.containerPrincipal}>
   {noFriends && noFriends.map(e=>{return <Friend name={e.name} lastname={e.lastname} id={e.id} mail={e.mail}/>})}
  
   </div>
    </div>
  </>
}