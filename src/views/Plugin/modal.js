import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import {
 
    TextField,
 
  } from '@material-ui/core';
  import APIManager from 'src/utils/LinkAPI';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {

const {boards, setBoards}=props;
 
  const AddBoard = ()=>{
  
      var token = JSON.parse(localStorage.getItem("Token")).token;
        
      const requestURL = APIManager+"/api/CreateBoard";
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'My-Custom-Header': 'foobar'
        }
      };
      
      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
            if (result.code==0)
            {
              if (boards.includes(result.data))
              {
                  alert('đã có')
              }
              else
              {
                setBoards(
                  [...boards,result.data]
              )
              }
             
            }
            else
            {
              alert(result.data)
            }
         
        });
   
  }
  
  

  return (
    <div>
      
      <Button variant="contained" color="primary" > 
          <AddIcon onClick={AddBoard}></AddIcon>        
        </Button>
    
    </div>
  );
}