import axios from "axios"
import React from "react";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { getPostData } from "../reducers/data/dataSlice";

export default function useGetUserData(id){
  const dispatch=useDispatch()
    const [state,setState] =useState()
    useEffect(()=>{
      const fetch=async()=>{
        try{
          const data=await axios.get(`${process.env.REACT_APP_URL_BACKEND}/posts/allPosts/${id}`).then(e=>{return (e.data) })
         
          dispatch(getPostData({
           misPublicaciones:data.misPublicaciones,
           publicacionesAmigos:data.publicacionesAmigos
       })) 
        }
        catch(e){console.log(e)}
       
      }
    fetch()

    
    },[])
   
    
   return state
}