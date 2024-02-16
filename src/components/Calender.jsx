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

//sockets
import io from 'socket.io-client';

export const Calender=()=>{
  const name=sessionStorage.getItem('name');
  const userId=sessionStorage.getItem('userId',);
 // const destinatarioId = sessionStorage.getItem('userId');
 // console.log(destinatarioId)
  const serverUrl = 'http://localhost:3006';  
  const socket = io(serverUrl);
  const [selectedFriend, setSelectedFriend] = useState(null);


  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState('');
  

  useEffect(() => {
    
    socket.emit('join', { idUser: userId, name: name})
    
    socket.on('private_message', (data) => {
      
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data)
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
      
        setFriends(e.data.friends)
       // setNoFriends(e.data.noFriends)
      })
  } 
  useEffect(()=>{
    getFriends()

    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("userId");  // Obtén el ID del usuario desde donde lo tengas almacenado
        const response = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/messages/get/`+id)
        console.log(response.data)
        setMessages(response.data);
      } catch (error) {
        console.error("Error al obtener mensajes del usuario desde el backend:", error);
      }
    };
  
    fetchData();


  },[])


    return (
        <div style={{
            
            
            display:"flex",
            justifyContent:"center",
            height:"500px"
        }}>
         elige un amigo para hablar<br/>
         <div>
  {friends &&
    friends.map((e) => (
      <div
        key={e.idUser}
        
        onClick={() => setSelectedFriend({...e})}
      >
        {e.name} {e.idFollowed}
      </div>
    ))}
</div>




        



        <div>
      {/* Renderizar mensajes */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.name}:</strong> {msg.contenido}
          </li>
        ))}
      </ul>
chat
      {/* Entrada de mensaje y botón de envío */}
      <div>
        <input
          type="text"
          placeholder="escribe un mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
        </div>
      );
        
        }
