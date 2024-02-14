import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./Friends.module.css";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { Friend } from "./Friend";
import axios from "axios"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
export const Friends=()=>{
  const id =localStorage.getItem('id')
  const [friends,setFriends]=useState(null)
  const [noFriends,setNoFriends]=useState(null)
  const getFriends=async()=>{
      axios.get(`${process.env.REACT_APP_URL_BACKEND}/relationships/allFollows/`+id).then((e)=>{
      
        setFriends(e.data.friends)
       // setNoFriends(e.data.noFriends)
      })
  }
  useEffect(()=>{
    getFriends()
  },[])
    return <>
    <div className={styles.app}>
      

   
   <div className={styles.containerPrincipal}>
    <h4 className={styles.tusamigos}>Todos tus amigos:</h4>
   {friends&& friends.map((friend)=>{return <div style={{
    paddingLeft:"20px"
   }}>
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={friend.urlProfile} style={{width:"60px",height:"60px"}} />
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
              {` — ${friend.liveCountry} `}
              <br/>
              {`Miembro desde: ${new Date(friend.createdAt.seconds * 1000).toLocaleDateString()}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
   </div>})}
   
   
   </div>
    </div>
  </>
}