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
import SpinnerComponent from "./Spinner";
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export const Store=()=>{
  const id = useSelector(state=>state.userSelected.id)
  
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [products,setProducts] = useState([])
  const [publicacion,setPublicaciones]=useState()
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setProducts(response.data);
      console.log(response)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
    return <div style={{ marginLeft: "200px",marginTop:"20px" }}>
      
      
      <TextField fullWidth label="Buscar..." id="fullWidth" style={{margin:"20px"}}/>
    <div style={{
      display:"flex"
    }}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Orden</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Orden"
          onChange={handleChange}
          style={{width:"200px"}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Precio</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Precio"
          onChange={handleChange}
          style={{width:"200px"}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
      

  
    <div style={{display:"flex",flexWrap:"wrap" }}>

    {loading ? (
      <SpinnerComponent />
    ) : products.length > 0 ? (
      products.map((article) => (
        <Card sx={{ maxWidth: 200 }} style={{margin:"20px"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={article.images[0]}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {article.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {article.price} usd 
          </Typography>
          <Button size="small" variant="contained" endIcon={<ShoppingCartIcon />}>
        Comprar
      </Button>
        </CardContent>
      </CardActionArea>
    </Card>
      ))
    ) : (
      <p>No hay productos disponibles.</p>
    )}
  </div>
  </div>
   
}