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

export const Calender=()=>{
  const id = useSelector(state=>state.userSelected.id)
  const [date, setDate] = useState(new Date());
  
  
    return (
        <div style={{
            paddingLeft:"200px",
            maxWidth:"800px",
            display:"flex",
            justifyContent:"center",
            height:"500px"
        }}>
        
        </div>
      );
        
        }
