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
import {RiCake2Fill} from "react-icons/ri"
import Button from 'react-bootstrap/Button';
import useGetUserData from "../helpers/useGetUserData";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
export const Profile=()=>{
  const id =localStorage.getItem('id')
  const urlProfile =localStorage.getItem('urlProfile')
  useGetUserData(id)
  const myPosts = useSelector(state=>state.data.misPublicaciones)
  const myInfo = useSelector(state=>state.user)
  //Modal logic
  const [show, setShow] = useState(false);
  const handleClose=()=>{
    setShow(false)
  }
  const handleEditProfile=(e)=>{
   setShow(true)
  }
  const [edit,setEdit]=useState({
    name:myInfo.name,
    lastname:myInfo.lastname,
    date:myInfo.date,
    country:myInfo.country,
    liveCountry:myInfo.liveCountry,
    ocupation:myInfo.ocupation,
    mail:myInfo.mail,
    birthday:myInfo.birthday
  })
  const handleEditProfileSend = async(e) => {
    e.preventDefault()
    await axios.put(`${process.env.REACT_APP_URL_BACKEND}/users/updateUser/${id}`,edit)
        .then(e=>{
          
          if(e.data.status===true){
            console.log("tosat wrokin")
            console.log(e.data.message)
            toast.info(`${e.data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
                
        }
        else{
            toast.error(`${e.data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
      })
        
    setShow(false)
    console.log(edit)
};
const editHandler=(e)=>{
  setEdit({...edit,[e.target.name]:e.target.value})
}
//PERFIL PICTURE SETTINGS

const [file,setFile]=useState(null)
const sendFile=async(e)=>{
  const data=new FormData()
  data.append("archivo",file)
  console.log(file)
  e.preventDefault()
  await axios.post(`${process.env.REACT_APP_URL_BACKEND}/users/updateProfilePicture/${id}`,data).then(e=>{console.log(e.data)})
}
const fileHandler=(e)=>{
  setFile(e.target.files[0])
  
}
    return <div className={styles.containerPrincipal}>

    <div className={styles.portada}>
      <div className={styles.portadaUp}>
        <div> 
          <form onSubmit={sendFile}>
          <img src={urlProfile} className={styles.picture}/>
          <label for="file-input" class="custom-file-upload">
            Seleccionar foto
          </label>
          <input type="file" onChange={fileHandler} id="file-input" className={styles.inputFile}></input>
          <button>Actualizar foto</button>
          </form>
          </div> 
        <div className={styles.portadaUpInside}><div className={styles.nombre}><h1>{myInfo.name} {myInfo.lastname}</h1></div><div className={styles.editProfile}> <Button variant="secondary" onClick={handleEditProfile}><AiFillEdit/> Editar perfil</Button> </div></div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleEditProfileSend} className={styles.formProfile}>
          <label>Nombre</label>
                <input type="text" value={edit.name} onChange={editHandler} name="name"/>
                <label>Apellido</label>
                <input type="text" value={edit.lastname} onChange={editHandler} name="lastname"/>
                
                <label>Nacionalidad</label>
                <input type="text" value={edit.country} onChange={editHandler} name="country"/>
                <label>Pais de residencia</label>
                <input type="text" value={edit.liveCountry} onChange={editHandler} name="liveCountry"/>
                <label>Ocupacion</label>
                <input type="text" value={edit.ocupation} onChange={editHandler} name="ocupation"/>
                <label>Correo electronico</label>
                <input type="mail" value={edit.mail} onChange={editHandler} name="mail"/>
                <label>Fecha de nacimiento</label>
                <input type="date" value={edit.birthday} onChange={editHandler} name="birthday"/>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditProfileSend}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.portadaDown}>
        <div className={styles.detalles}>
          <ul>
            <li>
              <MdOutlineWatchLater className={styles.logo}/> Miembro desde {myInfo.date}
            </li>
            <li>
              <BsFillHouseDoorFill className={styles.logo}/> Vive en {myInfo.country}
            </li>
            <li>
              <FaMapMarkerAlt className={styles.logo}/> De {myInfo.liveCountry}
              </li>
              <li>
                <FaUserGraduate className={styles.logo}/> Ocupación {myInfo.ocupation}
              </li>
            <li>
              <AiFillMail className={styles.logo}/>Correo {myInfo.mail}
            </li>
            <li>
              <RiCake2Fill className={styles.logo}/>Fecha de nacimiento {myInfo.birthday}
            </li>
          </ul>
        </div>
      </div>
      
    </div>


    <div className={styles.publicaciones}>
   {myPosts.map(e=>{return <PostCard publicacion={e.publicacion} nombre={e.nombre} apellido={e.apellido} idPublicacion={e.idPublicacion} date={e.date} time={e.time} usersComments={e.usersComments} usersLinked={e.usersLinked} idUser={e.idUser} urlProfile={urlProfile}/>})}
   </div>

   </div>
    
  
}