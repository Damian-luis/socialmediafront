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
export const Calender=()=>{
  const id = useSelector(state=>state.userSelected.id)
  const [date, setDate] = useState(new Date());
  
  const theme = createTheme({
    overrides: {
      MuiPickersDay: {
        day: {
          fontSize: "16px", // ajusta el tamaño del número de la fecha
        },
        daySelected: {
          backgroundColor: "#3f51b5", // ajusta el color de fondo del día seleccionado
        },
      },
      MuiPickersCalendar: {
        transitionContainer: {
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)", // ajusta la distancia entre los días
        },
      },
    },
  });
  
    return (
        <div style={{
            
            
            display:"flex",
            justifyContent:"center",
            height:"500px"
        }}>
        <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          renderInput={(startProps, endProps) => (
            <>
              <input {...startProps.input} />
              <span style={{ margin: "0 8px" }}>to</span>
              <input {...endProps.input} />
            </>
          )}
          startText="Start"
          endText="End"
          style={{ width: "100%", height: "600px" }}
        />
      </LocalizationProvider>
    </ThemeProvider>
        </div>
      );
        
        }
