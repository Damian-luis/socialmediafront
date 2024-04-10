import styles from "./Search.module.css";
import React from "react";
import {Sidebar} from "./Sidebar"
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { Friend } from "./Friend";
import axios from "axios"
import { PostCardEdit } from "./PostCardEdit";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
export const Search=()=>{
  const id =sessionStorage.getItem('userId')
 
  const [friends,setFriends]=useState(null)
  const [noFriends,setNoFriends]=useState(null)
  const getFriends=async()=>{
      axios.get(`${process.env.REACT_APP_URL_BACKEND}/relationships/allFollows/`+id).then((e)=>{
         console.log(e.data)
        setFriends(e.data.friends)
        setNoFriends(e.data.noFriends)
      })
  }
  useEffect(()=>{
    getFriends()
    
  },[])
    return <>
    <div className={styles.app}>
      

   
   <div className={styles.containerPrincipal}>
   {noFriends&& noFriends.map((friend)=>{return <div style={{
    paddingLeft:"20px"
   }}>
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start"
      component={Link}
      to={`/visit-profile/${friend.id}`}>
        <ListItemAvatar>
                          <Avatar
                          alt={`${friend.name} ${friend.lastname}`}
                          src={friend.urlProfile}
                          style={{ width: "60px", height: "60px" }}
                        >
                          {friend.urlProfile ? undefined : `${friend.name.charAt(0)}${friend.lastname.charAt(0)}`}
                        </Avatar>
        </ListItemAvatar>
        <ListItemText
        style={{
          paddingLeft:"30px",
          color:"black"
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