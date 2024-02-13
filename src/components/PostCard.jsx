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
import { ToastContainer, toast } from 'react-toastify';

//

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import Paper from '@mui/material/Paper';

export const PostCard=(props)=>{
 
  const formattedTime = moment(`${props.date} ${props.time}`, 'DD/MM/YYYY HH:mm:ss').fromNow();
  const avatarInitial = `${props.nombre.charAt(0)}${props.apellido.charAt(0)}`;
    const idPublicacion=props.idPublicacion
    const urlProfile =localStorage.getItem('urlProfile')
    const myId = localStorage.getItem("id")
    const [show, setShow] = useState(false);

  const handleCloseSend = async(e) => {
    e.preventDefault()
    await axios.put(`${process.env.REACT_APP_URL_BACKEND}/posts/updatePost/${myId}/${idPublicacion}`,post)
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
<div style={{
  margin:"20px",
  width:"500px"
}}>
<Paper elevation={12}>
<CardHeader
        avatar={
          <Avatar
            src={props.urlProfile ? props.urlProfile : undefined}
            alt={`${props.nombre} ${props.apellido}`}
          >
            {props.urlProfile ? undefined : avatarInitial}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${props.nombre} ${props.apellido}`}
        subheader={formattedTime}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.publicacion}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{color:props.like===true?"red":"gray"}}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Paper>
<Card style={{with:"600px"}}>
      



      {props.usersComments.length > 0 && props.usersComments.map(e=>{return <div style={{paddingLeft:"80px"}}>
      
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {e.name.charAt(0)}{e.lastname.charAt(0)}
          </Avatar>
        }
        title={`${e.name} ${e.lastname}`}
        subheader={formattedTime}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {e.comment}
        </Typography>
      </CardContent>
      </div>})}

    </Card>
    </div>
        </>
}