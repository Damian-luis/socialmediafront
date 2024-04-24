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
import { useParams } from 'react-router-dom';import Avatar from '@mui/material/Avatar';

export const VisitProfile=()=>{
  //const id = useSelector(state=>state.userSelected.id)
  const { id } = useParams();
  const [dataUser,setDataUser]=useState({
    name:"",
    lastname:"",
    mail:"",
    date:"",
    time:"",
    id:"",
    birthday:"",
    country:"",
    liveCountry:"",
    urlProfile:"",
    ocupation:""

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
    return <>
    

   
   <div className={styles.containerPrincipal}>
   
   <div className={styles.portada}>
      <div className={styles.portadaUp}>
        
        <div className={styles.portadaUpInside}>
        <Avatar alt="Imagen de perfil" src={dataUser.urlProfile} style={{ width: "60px", height: "60px",marginRight:"20px" }}>
            {dataUser.urlProfile ? undefined : `${dataUser.name.charAt(0)}${dataUser.lastname.charAt(0)}`}
          </Avatar>
          <div className={styles.nombre}><h1>{dataUser.name} {dataUser.lastname}</h1></div><div className={styles.editProfile}>  </div></div>
      </div>
      <div className={styles.portadaDown}>
        <div className={styles.detalles}>
          <ul>
            <li>
              <MdOutlineWatchLater className={styles.logo}/> Miembro desde {dataUser.date}
            </li>
            <li>
              <BsFillHouseDoorFill className={styles.logo}/> Vive en {dataUser.country}
            </li>
            <li>
              <FaMapMarkerAlt className={styles.logo}/> De {dataUser.liveCountry}
              </li>
              <li>
                <FaUserGraduate className={styles.logo}/> Ocupación {dataUser.ocupation}
              </li>
            <li>
              <AiFillMail className={styles.logo}/>Correo {dataUser.mail}
            </li>
            <li>
              <RiCake2Fill className={styles.logo}/>Fecha de nacimiento {dataUser.birthday}
            </li>
          </ul>
        </div>
      </div>
      
    </div>


   
  <div className={styles.publicaciones}>
   {post && post.map(e=>{return <PostCard urlProfile={dataUser.urlProfile} publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} id={e.idUser} date={e.date} time={e.time} like={e.like} usersComments={e.usersComments} usersLinked={e.usersLinked} idPublicacion={e.idPublicacion}/>})}
  </div>
  
   </div>
   
  </>
}