import React from "react";
import styles from "./PostCardEdit.module.css";
import {MdDeleteOutline} from "react-icons/md"
import {AiOutlineEdit} from "react-icons/ai"
import { useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { updatePostData,deletePostData } from "../reducers/data/dataSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
export const PostCardEdit=(props)=>{
  const name =useSelector(state=>state.user.name)
    const lastname =useSelector(state=>state.user.lastname)
    const id =sessionStorage.getItem('userId')
    const idPublicacion=props.idPublicacion
    const dispatch=useDispatch()
    const [show, setShow] = useState(false);

  const handleClose = (e) => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const [post,setPost]=useState({
    publicacion:props.publicacion,
    nombre:"",
    apellido:"",
    id:"",
    idPublicacion:""
  })

    const postHanlder=(e)=>{
      setPost({
        nombre:name,
        apellido:lastname,
        id,
        idPublicacion:props.idPublicacion,
        publicacion:e.target.value})
    }

    const sendPost=async(e)=>{
        e.preventDefault()
        dispatch(updatePostData({
            nombre:name,
            apellido:lastname,
            id,
            publicacion:post.publicacion,
            idPublicacion:post.idPublicacion
        }))
        setShow(false);
        await axios.put(`${process.env.REACT_APP_URL_BACKEND}/posts/updatePost/${id}/${idPublicacion}`,post)
        .then(e=>{alert(e.data.message)})
        setPost({
          publicacion:props.publicacion,
          nombre:name,
          apellido:lastname,
          id,
          idPublicacion:""
        })
        
    }
const deletePostHandler=async(e) => {
 
  dispatch(deletePostData({
    idPublicacion:props.idPublicacion,
    id
}))

await axios.delete(`${process.env.REACT_APP_URL_BACKEND}/posts/deletePost/${id}/${idPublicacion}`)
        .then(e=>{alert(e.data.message)})
}
    return <>
    <div className={styles.card}>
        

        <div className={styles.post}>
        <div className={styles.nombre}>
            <h4>{props.nombre} {props.apellido}</h4>
            <span>{props.date} {props.time}</span>
        </div>
        <div className={styles.publicacion}>
            <p>{props.publicacion}</p>
        </div>
        </div>


        <div className={styles.buttons}>
        <Button variant="secondary" onClick={handleShow}>Editar <AiOutlineEdit/></Button>
        <Button variant="danger" onClick={deletePostHandler}>Eliminar <MdDeleteOutline/></Button>
        </div> 

        
    </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar publicacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <input type="text" value={post.publicacion} onChange={postHanlder}/>
            </form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={sendPost}>
            Publicar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}