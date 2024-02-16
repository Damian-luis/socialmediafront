import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostData } from "../reducers/data/dataSlice";

export default function useGetUserData(id) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/posts/allPosts/${id}`);
        const data = response.data;

        
        dispatch(getPostData({
          misPublicaciones: data.misPublicaciones,
          publicacionesAmigos: data.publicacionesAmigos
        }));

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [dispatch, id]);

  return userData;
}
