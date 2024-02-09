import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./VisitProfile.module.css";
import { PostCard } from "./PostCard";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useEffect,useState } from "react";
import {MdOutlineWatchLater} from "react-icons/md"
import {BsFillHouseDoorFill} from "react-icons/bs"
import {FaMapMarkerAlt} from "react-icons/fa"
import {FaUserGraduate} from "react-icons/fa"
import {AiFillMail} from "react-icons/ai"
import {AiFillEdit} from "react-icons/ai"
import {RiCake2Fill} from "react-icons/ri"
export const News=()=>{
  const id = useSelector(state=>state.userSelected.id)
  
  const [dataUser,setDataUser]=useState({
    name:"",
    lastname:"",
    mail:"",
    date:"",
    time:"",
    id:""

  })
  const [news,setNews] = useState([])
  const [publicacion,setPublicaciones]=useState()
  const getData=async()=>{
    await axios.get(`https://newsapi.org/v2/top-headlines?country=ar&apiKey=746149c5c5e44447a5f67f4f59640894`).then(e=>{
          setNews(e.data)
        console.log(e.data)
}).catch(e=>{console.log(e)})
  }
  useEffect(()=>{
    getData()
  },[])
    return <div style={{
        paddingLeft:"200px"
    }}>
    noticas
</div>
    
   
}