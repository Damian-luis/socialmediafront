import React from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { selectUser } from "../reducers/userSelected/userSelectedSlice";
import styles from "./PostCard.module.css";
import {AiFillHeart} from "react-icons/ai"
import {AiFillEdit} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
export const PostCard=(props)=>{
    const idPublicacion=props.idPublicacion
    const myId = localStorage.getItem("id")
    const [show, setShow] = useState(false);

  const handleCloseSend = async(e) => {
    e.preventDefault()
    await axios.put(`${process.env.REACT_APP_URL_BACKEND}/posts/updatePost/${myId}/${idPublicacion}`,post)
        .then(e=>{alert(e.data.message)})
        setPost({
          publicacion:props.publicacion,
          nombre:name,
          apellido:lastname,
          id:myId,
          idPublicacion:""
        })
    setShow(false)
};
const handleClose=()=>{
  setShow(false)
}
  const handleShow = () => setShow(true);
    
    const name = useSelector(state=>state.user.name)
    const lastname = useSelector(state=>state.user.lastname)
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
          id:myId,
          idPublicacion:props.idPublicacion,
          publicacion:e.target.value})
      }
    const [comment,setComment]=useState("")
 const liked=props.like
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const profileHandler=async(e)=>{
        e.preventDefault()
        dispatch(selectUser({id:props.id}))
        navigate("/visit-profile")

    }
    const commentHandler=(e)=>{
        setComment(e.target.value)
    }
    const sendComment=async(e)=>{
        e.preventDefault()
        console.log(comment)
        await axios.post(`${process.env.REACT_APP_URL_BACKEND}/interactions/commentPost/${props.idPublicacion}/${myId}/${name}/${lastname}`,{comment}).then(e=>{console.log(e.data.response)})
        setComment("")
    }
    const reactHandler=async(e)=>{
        e.preventDefault() 
        
        await axios.put(`${process.env.REACT_APP_URL_BACKEND}/interactions/reactPost/${props.idPublicacion}/${myId}/${name}/${lastname}`).then(e=>{console.log(e.data.response)})
        setComment("")
    }
    return <>
    <div className={styles.card}>
        <div className={styles.nombre} /*onClick={profileHandler}*/>
            <div className={styles.nombreLeft}>
            <img src="https://www.seekpng.com/png/full/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png" className={styles.picture}></img>
            </div>
            <div className={styles.nombreRight}>
            <h4>{props.nombre} {props.apellido}</h4>
            <span>{props.date} {props.time}</span>
            </div>
            {props.idUser===myId&&<div className={styles.buttonSection}><Button variant="secondary" onClick={handleShow}><AiFillEdit /><span className={styles.buttonPost}>Editar</span></Button><Button variant="danger"><AiFillDelete/><span className={styles.buttonPost}>Eliminar</span></Button></div>}
        
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
          <Button variant="primary" onClick={handleCloseSend}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
        
        <div className={styles.publicacion}>
            <p>{props.publicacion}</p>
        </div>
       <div>
        <AiFillHeart className={liked?styles.heartLiked:styles.heartUniked} onClick={reactHandler}/> {props.usersLinked.length}  reacciones
        </div>
        
            
             
        {props.usersComments.length > 0 && props.usersComments.map(e=>{return <div className={styles.commentCard}>
            <div className={styles.nombre}>
                <div className={styles.commentsLeft}>
                <img src="https://www.seekpng.com/png/full/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png" className={styles.picture}></img>
                </div>
                <div className={styles.commentsRight}>
                <h4>{e.name} {e.lastname}</h4> <span>{e.data} {e.time}</span>
                </div>
                
            </div>
        
            <div className={styles.comment}>
            <p>{e.comment}</p>
            </div>
        </div>})}

                <div>
            <form onSubmit={sendComment}>
                <input placeholder="Escribe un comentario..." onChange={commentHandler} value={comment}/>
                <Button variant="primary" type="submit">
                Publicar
                </Button>
            </form>
        </div>
            
        </div>

        
    
    </>
}