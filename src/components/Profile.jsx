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
import { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
export const Profile=()=>{
  const name =sessionStorage.getItem("name");
    const lastname =sessionStorage.getItem("lastname");
  const id =sessionStorage.getItem('userId')
  const urlProfile =sessionStorage.getItem('urlProfile')
   const [uploadButtonVisible, setUploadButtonVisible] = useState(false);
  const [userData,setUserData]=useState(null)
  const [misPublicaciones,setMisPublicaciones]=useState([])
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/users/getUserData/` + id);
      
      setUserData(response.data);
      setMisPublicaciones(response.data.post)
      
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);


  
  //useGetUserData(id)
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
        <div style={{
          width:"100%",
          
        }}> 
        <div style={{
          display:"flex",
          justifyContent:"space-between"
        }}>
          <div style={{
            display:"flex"
          }}>
          <Avatar alt="Imagen de perfil" src={urlProfile} style={{
            width:"60px",
            height:"60px",
            marginRight:"20px"
          }}>
            {urlProfile ? undefined : `${name.charAt(0)}${lastname.charAt(0)}`}
          </Avatar>
          <h1>{myInfo.name} {myInfo.lastname}</h1> 
          </div>
          <div>
          <Button variant="secondary" onClick={handleEditProfile}><AiFillEdit/> Editar perfil</Button>
          </div>
        
          
          
          </div>
          
             
          <form onSubmit={sendFile}>
          <div style={{
            left:"0px"
          }}>
          <label for="file-input" class="custom-file-upload">
            Cambiar foto
          </label>
          </div>
          
          <input type="file" onChange={fileHandler} id="file-input" className={styles.inputFile}></input>
          {file && (
              <Button variant="contained" onClick={sendFile}>
                Subir
              </Button>
            )}
          
          </form>
          </div> 
        
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
    {userData ? (
      <ul>
        <li>
          <MdOutlineWatchLater className={styles.logo}/> Miembro desde {userData.user[0].date}
        </li>
        <li>
          <BsFillHouseDoorFill className={styles.logo}/> Vive en {userData.user[0].country}
        </li>
        <li>
          <FaMapMarkerAlt className={styles.logo}/> De {userData.user[0].liveCountry}
        </li>
        <li>
          <FaUserGraduate className={styles.logo}/> Ocupación {userData.user[0].ocupation}
        </li>
        <li>
          <AiFillMail className={styles.logo}/>Correo {userData.user[0].mail}
        </li>
        <li>
          <RiCake2Fill className={styles.logo}/>Fecha de nacimiento {userData.user[0].birthday}
        </li>
      </ul>
    ) : (
      <p>Cargando información del usuario...</p>
    )}
  </div>
</div>
      
    </div>


    <div className={styles.publicaciones}>
  {misPublicaciones.length > 0 ? (
    misPublicaciones.map((e) => (
      <PostCard
        key={e.idPublicacion} 
        publicacion={e.publicacion}
        nombre={e.nombre}
        apellido={e.apellido}
        idPublicacion={e.idPublicacion}
        date={e.date}
        time={e.time}
        usersComments={e.usersComments}
        usersLinked={e.usersLinked}
        idUser={e.idUser}
        urlProfile={urlProfile}
      />
    ))
  ) : (
    <p>No hay publicaciones disponibles.</p>
  )}
</div>


   </div>
    
  
}