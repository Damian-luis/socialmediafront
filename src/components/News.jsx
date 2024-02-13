import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./VisitProfile.module.css";
import { PostCard } from "./PostCard";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useEffect,useState } from "react";
import {MdOutlineWatchLater} from "react-icons/md"
import {BsFillHouseDoorFill} from "react-icons/bs"
import {FaMapMarkerAlt} from "react-icons/fa"
import {FaUserGraduate} from "react-icons/fa"
import {AiFillMail} from "react-icons/ai"
import {AiFillEdit} from "react-icons/ai"
import {RiCake2Fill} from "react-icons/ri"
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SpinnerComponent from "./Spinner";
import { Link } from 'react-router-dom';
export const News=()=>{
  const id = useSelector(state=>state.userSelected.id)
  
  const [dataUser,setDataUser]=useState({
    name:"",
    lastname:"",
    mail:"",
    date:"",
    time:"",
    id:""

  })
  const [news,setNews] = useState([])
  const [publicacion,setPublicaciones]=useState()
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=ar&apiKey=746149c5c5e44447a5f67f4f59640894"
      );
      setNews(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
    return <div style={{display:"flex",flexDirection:"column" }}>
    {loading ? (
      <SpinnerComponent />
    ) : news.length > 0 ? (
      news.map((article) => (
        <Card key={article.url} variant="outlined" sx={{ maxWidth: 600}} style={{
          
          margin:"30px"
        }}>
          <Box sx={{ p: 2 }}>
          <Typography color="text.secondary" variant="body2">
              {article.publishedAt}
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
            
            </Stack>
            
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
              Fuente: {article.source.name}
            </Typography>
            <Stack direction="row" spacing={1}>
            <Chip
                  color="primary"
                  label="Visitar enlace"
                  size="small"
                  onClick={() => window.open(article.url, '_blank')}
                />
            </Stack>
          </Box>
        </Card>
      ))
    ) : (
      <p>No hay noticias disponibles.</p>
    )}
  </div>
    
   
}