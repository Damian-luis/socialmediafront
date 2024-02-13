import React from "react";
import {Sidebar} from "./Sidebar"
import styles from "./VisitProfile.module.css";
import { PostCard } from "./PostCard";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useEffect,useState } from "react";
import {MdOutlineWatchLater} from "react-icons/md"
import {BsFillHouseDoorFill} from "react-icons/bs"
import {FaLess, FaMapMarkerAlt} from "react-icons/fa"
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
import { useParams } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions';
export const Product=()=>{
    const { id } = useParams();
  console.log(id)
  console.log("2")
  const [product,setProduct] = useState(false)
  const [publicacion,setPublicaciones]=useState()
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      setProduct(response.data);
      console.log(response)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ marginLeft: "200px", marginTop: "30px" }}>
    {loading ? (
      <SpinnerComponent />
    ) : product ? (
      <>
        <ImageList sx={{ width: 600, height: 200 }} cols={3} >
          {product.images.map((imageUrl, index) => (
            <ImageListItem key={index}>
              <img
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
<div style={{
    width:"60%"
}}>
        <Card sx={{ minWidth: 275, marginTop: 5 }}>
          <CardContent>
            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
              {product.category.name}
            </Typography>
            <Typography variant="h4" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2">
              {product.description}
            </Typography>
            <Typography variant="h4" component="div">
              {product.price}
            </Typography>
          </CardContent>
          <CardActions>
          <Button size="small" variant="contained" endIcon={<ShoppingCartIcon />}>
        Comprar
      </Button>
          </CardActions>
        </Card>
        </div>
      </>
    ) : (
      <p>No hay productos disponibles.</p>
    )}
  </div>
  );
};