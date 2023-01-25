import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "../reducers/userSelected/userSelectedSlice";
export const Friend=(props)=>{
    console.log(props)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const profileHandler=async(e)=>{
        e.preventDefault()
        console.log(e.target.value)
        dispatch(selectUser({id:e.target.value}))
        navigate("/visit-profile")

    }
    return <>
    <div>
        {props.name} {props.lastname}
        <button value={props.id} onClick={profileHandler}>Ver perfil</button>
    </div>
    </>
}