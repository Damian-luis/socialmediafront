import React from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useEffect,useState,useRef } from "react";
import Calendar from 'react-calendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Skeleton } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import styles from "./Calender.module.css"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from "@mui/material/Paper";
//sockets
import io from 'socket.io-client';

export const Calender=()=>{
  const name=sessionStorage.getItem('name');
  const userId=sessionStorage.getItem('userId',);
 // const destinatarioId = sessionStorage.getItem('userId');
 // console.log(destinatarioId)
  const serverUrl = 'http://localhost:3006';  
  const socket = io(serverUrl);
  
  const [originalMessages, setOriginalMessages] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    
    socket.emit('join', { idUser: userId, name: name})
    
    socket.on('private_message', (data) => {
      if (data.contenido && data.para && data.de) {
        const newMessage = {
          contenido: data.contenido,
          to: data.para,
          from: data.de,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error('El mensaje recibido del socket no tiene el formato esperado:', data);
      }
      
    });

    socket.on('ping', () => {
      socket.emit('pong'); 
    });


    
    return () => {
      socket.disconnect();
    };
  }, []);  

const sendMessage = () => {
  console.log('Enviando mensaje privado:', { contenido: message, para: selectedFriend.idFollowed, de: userId });
  if (message.trim() && selectedFriend) {
    socket.emit('private_message', {
      contenido: message,
      para: selectedFriend.idFollowed,
      de: userId,
    });

    const newMessage = {
      contenido: message,
      name: name,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessage('');
  }
};


  

  const id =sessionStorage.getItem('userId')
  const [friends,setFriends]=useState(null)
  
  const getFriends=async()=>{
      axios.get(`${process.env.REACT_APP_URL_BACKEND}/relationships/allFollows/`+id).then((e)=>{
      console.log(e.data)
        setFriends(e.data.friends)
       // setNoFriends(e.data.noFriends)
      })
  } 

  useEffect(()=>{
    getFriends()

  },[])

  useEffect(()=>{
    

    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/messages/get/`+id)
        setMessages(response.data);
        setOriginalMessages(response.data)
      } catch (error) {
        console.error("Error al obtener mensajes del usuario desde el backend:", error);
      }
    };
  
    fetchData();


  },[])


 
  const handleFriendClick = (friend) => {
    setSelectedFriend({ 
      idFollowed: friend.idFollowed,
      name:friend.name,
      lastname: friend.lastname,
      urlProfile: friend.urlProfile,
      mail:friend.mail });
    filterMessagesByFriend(friend.idFollowed);
  };
  
  const filterMessagesByFriend = (friendId) => {
    // Filtra los mensajes según el amigo seleccionado
    const filteredMessages = originalMessages.filter((msg) => {
      return (
        (msg.from === id && msg.to === friendId) ||
        (msg.from === friendId && msg.to === id)
      );
    });

    // Ordena los mensajes cronológicamente antes de actualizar el estado
    const sortedMessages = filteredMessages.sort((a, b) => a.createdAt._seconds - b.createdAt._seconds);

    setMessages(sortedMessages);
  };

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    // Hacer scroll hacia abajo después de renderizar los mensajes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);
    return (
        <div style={{
          width:"-webkit-fill-available",
            paddingTop:"40px",
            display:"flex",
            justifyContent:"center",
            height:"500px",
            justifyContent:"space-between"
        }}>
         <div>

          
         {friends&& friends.map((friend)=>{return <div onClick={() => handleFriendClick(friend)} style={{
    paddingLeft:"20px"
   }}>
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={friend.urlProfile} style={{width:"50px",height:"50px"}} />
        </ListItemAvatar>
        <ListItemText
        style={{
          paddingLeft:"30px"
        }}
          primary={`${friend.name} ${friend.lastname}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {friend.mail}
              </Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
   </div>})}
</div>




        


{selectedFriend?
  <div style={{
          width:"55%",
          padding:"10px",
          marginRight:"50px"
        }}>

<ListItem alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt="Remy Sharp" src={selectedFriend ? selectedFriend.urlProfile : ""} style={{ width: "70px", height: "70px" }} />
  </ListItemAvatar>
  <ListItemText
    style={{
      paddingLeft: "30px"
    }}
    primary={
      <Typography variant="h5">
        {selectedFriend ? `${selectedFriend.name} ${selectedFriend.lastname}` : "Seleccione un amigo"}
      </Typography>
    }
    secondary={
      <React.Fragment>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
          fontSize="15px"
        >
          {selectedFriend ? selectedFriend.mail : ""}
        </Typography>
      </React.Fragment>
    }
  />
</ListItem>
     
     <div 
     ref={scrollContainerRef}
     style={{
  maxHeight: '400px',  
  overflowY: 'auto',
  scrollbarColor: 'transparent transparent',
  padding: '10px',
  marginTop: '10px'
}}>
  {messages.map((msg, index) => (
    <Paper
      key={index}
      style={{
        width: 'auto',
        height: 'auto',
        padding: '20px',
        backgroundColor: msg.from === id ? '#B0D0F0' : 'white',
        marginBottom: '10px',
        borderRadius: '10px'
      }}
    >
      {msg.contenido}
    </Paper>
  ))}
</div>


      <div style={{
        display:"flex",
        justifyContent:"space-between"
      }}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            padding:"20px"
          }}
        />
        <Button variant="contained" onClick={sendMessage} endIcon={<SendIcon />}/>
      </div>
    </div>

    :
    <div style={{
      padding:"50px"
    }}>
      <Typography variant="h6">
        Seleccione un amigo para comenzar a chatear
      </Typography>
      </div>}
        



        </div>
      );
        
        }
