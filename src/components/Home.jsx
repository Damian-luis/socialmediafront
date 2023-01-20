import React from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";
import {Sidebar} from "./Sidebar"
import {AiOutlineBars} from "react-icons/ai";

export const Home=()=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const mail=useSelector(state=>state.user.mail)
    return <>
   <Sidebar/>
    <AiOutlineBars/>
  </>
}