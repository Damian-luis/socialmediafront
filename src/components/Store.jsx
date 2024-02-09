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
export const Store=()=>{
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
            birthday:e.data.user[0].birthday,
            country:e.data.user[0].country,
            liveCountry:e.data.user[0].liveCountry,
            urlProfile:e.data.user[0].urlProfile,
            ocupation:e.data.user[0].ocupation
 })
        console.log(e.data)
        setPost(e.data.post)
})
  }
  useEffect(()=>{
    getData()
  },[])
    return <div style={{
        paddingLeft:"200px"
    }}>
    tienda
</div>
}