import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./Friends.module.css";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { Friend } from "./Friend";
import axios from "axios"
export const Friends=()=>{
  const id = useSelector(state=>state.user.id)
  const [friends,setFriends]=useState(null)
  const [noFriends,setNoFriends]=useState(null)
  const getFriends=async()=>{
      axios.get(`${process.env.REACT_APP_URL_BACKEND}/relationships/allFollows/`+id).then((e)=>{
      
        setFriends(e.data.friends)
       // setNoFriends(e.data.noFriends)
      })
  }
  useEffect(()=>{
    getFriends()
  },[])
    return <>
    <div className={styles.app}>
      {/*<Sidebar/>*/}

   
   <div className={styles.containerPrincipal}>
    <h4 className={styles.tusamigos}>Todos tus amigos:</h4>
   {friends&& friends.map((friend)=>{return <Friend name={friend.name} lastname={friend.lastname} id={friend.idFollowed} mail={friend.mail}/>})}
   
  
   </div>
    </div>
  </>
}