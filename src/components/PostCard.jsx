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
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
//

import SendIcon from '@mui/icons-material/Send';
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
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import { deletePostData } from "../reducers/data/dataSlice";
import useGetUserData from "../helpers/useGetUserData";

export const PostCard=(props)=>{
 
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditPost = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const formattedTime = moment(`${props.date} ${props.time}`, 'DD/MM/YYYY HH:mm:ss').fromNow();
  const avatarInitial = `${props.nombre.charAt(0)}${props.apellido.charAt(0)}`;
    const idPublicacion=props.idPublicacion
    const urlProfile =localStorage.getItem('urlProfile')
    const myId = sessionStorage.getItem('userId')
    const [show, setShow] = useState(false);
    
    const [postLiked, setPostLiked] = useState({ like: props.like });
  const [likeCount, setLikeCount] = useState(props.usersLinked.length);

    const handleUpdatePost = async () => {
      try {
        await axios.put(`${process.env.REACT_APP_URL_BACKEND}/posts/updatePost/${myId}/${idPublicacion}`, post);
        toast.success('Cambios guardados exitosamente');
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        toast.error('Error al guardar los cambios');
      }
    };
  
    const handleDeletePost = async() => {
      try {
        axios.delete(`${process.env.REACT_APP_URL_BACKEND}/posts/deletePost/${myId}/${idPublicacion}`);
        await dispatch(deletePostData({ idPublicacion: props.idPublicacion }));
        //const updatedUserData = useGetUserData(id);
        toast.success('Publicación eliminada exitosamente');
        console.log('Nuevo estado después de la eliminación:', props.friendsPosts);
        
      } catch (error) {
        console.error(error);
        toast.error('Error al eliminar la publicación');
        
      }
    };
    

    const handleCloseSend = (action) => {
      if (action === 'update') {
        toast.confirm('¿Estás seguro de que quieres guardar los cambios?', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            handleUpdatePost();
          }
        });
      } else if (action === 'delete') {
        toast.confirm('¿Estás seguro de que quieres eliminar esta publicación?', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            handleDeletePost();
          }
        });
      } else {
        setAnchorEl(null);
      }
    }

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
        try{
          await axios.post(`${process.env.REACT_APP_URL_BACKEND}/interactions/commentPost/${props.idPublicacion}/${myId}/${name}/${lastname}`,{comment}).then(e=>{console.log(e.data.response)})
          setComment("")
        }
        catch(e){
          console.log(e)
        }
        
    }
    const reactHandler=async(e)=>{
        e.preventDefault() 
        try{
          await axios.put(`${process.env.REACT_APP_URL_BACKEND}/interactions/reactPost/${props.idPublicacion}/${myId}/${name}/${lastname}`)
          setPostLiked((prevPost) => ({ ...prevPost, like: !prevPost.like }));
          const newLikeCount = likeCount + (postLiked.like ? -1 : 1);
      
     
          setPostLiked({ like: !postLiked.like });
      
          
          setLikeCount((prevCount) => (postLiked.like ? prevCount - 1 : prevCount + 1));
        }
        catch(e){
          console.log(e)
        }
    }
    return <>
<div style={{
  margin:"20px",
  width:"500px",
}}>
<Paper elevation={12}
style={{
  padding:"22px"
}}
>
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
          myId === props.idUser && (
            <>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {isEditing ? (
                  <>
                    <MenuItem onClick={() => handleCloseSend("update")}>
                      Actualizar post
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseSend("delete")}>
                      Eliminar post
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => setIsEditing(true)}>
                    Actualizar post
                  </MenuItem>
                )}
                <MenuItem onClick={handleDeletePost}>Eliminar post</MenuItem>
              </Menu>
            </>
          )
        }
        title={`${props.nombre} ${props.apellido}`}
        subheader={formattedTime}
      />

{isEditing ? (
    <TextField
      value={post.publicacion}
      onChange={(e) =>
        setPost({
          ...post,
          publicacion: e.target.value,
        })
      }
      multiline
      fullWidth
      rows={4}
      variant="outlined"
    />
  ) : (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {props.publicacion}
      </Typography>
    </CardContent>
  )}
      <CardActions disableSpacing>
       {likeCount}<IconButton onClick={reactHandler} aria-label="add to favorites" style={{color: postLiked.like ? "red" : "gray"}}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    
      <Card style={{borderRadius:"0px"}}>
      



      {props.usersComments.length > 0 && props.usersComments.map(e=>{return <div style={{}}>
      
        <CardHeader
        avatar={
          <Avatar
          src={e.urlProfile ? e.urlProfile : undefined}
          sx={{ bgcolor: red[500] }} aria-label="recipe">
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

    <FormControl variant="standard" style={{display:"flex",flexDirection:"row",justifyContent:"space-around",padding:"10px"}}>
        <TextField
        id="input-with-icon-textfield"
        placeholder="Escribe un comentario"
        style={{
          padding:"10px"
        }}
        onChange={commentHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                        src={urlProfile}
                        alt="Imagen de perfil"
                        style={{ width: '24px', height: '24px', borderRadius: '50%' }}  
                      />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
                      <IconButton
                    color="primary"
                    aria-label="Enviar comentario"
                    onClick={sendComment}
                  >
                    <SendIcon />
                  </IconButton>
        </FormControl>

    </Paper>

    </div>
    <div>
        
    
        <ToastContainer />
      </div>
        </>
}