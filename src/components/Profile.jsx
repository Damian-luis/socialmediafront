import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./Profile.module.css";
import { PostCardEdit } from "./PostCardEdit";
import { useSelector,useDispatch } from "react-redux";
import { PostCard } from "./PostCard";
import {MdOutlineWatchLater} from "react-icons/md"
import {BsFillHouseDoorFill} from "react-icons/bs"
import {FaMapMarkerAlt} from "react-icons/fa"
import {FaUserGraduate} from "react-icons/fa"
import {AiFillMail} from "react-icons/ai"
import {AiFillEdit} from "react-icons/ai"

export const Profile=()=>{
  const myPosts = useSelector(state=>state.data.misPublicaciones)
  const myInfo = useSelector(state=>state.user)
  console.log(myInfo)
    return <div className={styles.containerPrincipal}>

    <div className={styles.portada}>
      <div className={styles.portadaUp}>
        <div><img src={"https://www.seekpng.com/png/full/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png"} className={styles.picture}/></div>
        <div className={styles.portadaUpInside}><div className={styles.nombre}><h1>{myInfo.name} {myInfo.lastname}</h1></div><div className={styles.editProfile}> <AiFillEdit/> Editar perfil</div></div>
      </div>

      <div className={styles.portadaDown}>
        <div className={styles.detalles}>
          <ul>
            <li>
              <MdOutlineWatchLater className={styles.logo}/> Miembro desde {myInfo.date}
            </li>
            <li>
              <BsFillHouseDoorFill className={styles.logo}/> Vive en
            </li>
            <li>
              <FaMapMarkerAlt className={styles.logo}/> De
              </li>
              <li>
                <FaUserGraduate className={styles.logo}/> Profesion
              </li>
            <li>
              <AiFillMail className={styles.logo}/>Correo {myInfo.mail}
            </li>
          </ul>
        </div>
      </div>
    </div>


    <div className={styles.publicaciones}>
   {myPosts.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} idPublicacion={e.idPublicacion} date={e.date} time={e.time} usersComments={e.usersComments} usersLinked={e.usersLinked}/>})}
   </div>

   </div>
    
  
}