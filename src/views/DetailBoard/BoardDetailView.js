import React, { useState,useEffect  } from 'react';
import { useParams } from 'react-router-dom';

import Game from 'src/views/RoomGame/Game'
import { makeStyles } from '@material-ui/core/styles';




const BoardDetailView = ( ) => {
 


  const params = useParams();


  useEffect(() => {
    async function fetchBoardList() {         
      const {id} = params;
      // const token = JSON.parse(localStorage.getItem("Token")).token;
    
    
      // const requestURL = APIManager+`/api/BoardController/getListBoardDetail/${id}`;
      // const requestOptions = {
      //   method: 'Get',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + token
      //   }
      //   // body: JSON.stringify({ title: 'React POST Request Example' })
      // };

      // fetch(requestURL, requestOptions)
      //   .then(response => response.json())
      //   .then(result => {
      //     if (result.code==0)
      //     {
           
      //       setBoardDetail(result.data);
      //     }
           
           
      //   });
    }

    fetchBoardList();
  }, []);
  
  return (
   <Game></Game>
  );
  
};

export default BoardDetailView;
