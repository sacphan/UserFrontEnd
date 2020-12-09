import React, { useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { useParams } from 'react-router-dom';
import ColumnContext from 'src/context/ColumnContext';
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

export default function SimpleModal() {

  const params = useParams();
    const columnContext = useContext(ColumnContext);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values,setValues] = React.useState({content:""});

  const handleOpen = () => {
      
   
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
 
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
 
  const AddRow = ()=>{
    if (values.content!='')
    {
      const boardDetailAdd = {
        Content:values.content,
        ColumnId:columnContext.coloumn.id,
        BoardId:params.id
      }
      handleClose();
      var token = JSON.parse(localStorage.getItem("Token")).token;
        
      const requestURL = APIManager+"/api/BoardController/addBoardDetail";
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'My-Custom-Header': 'foobar'
        },
         body: JSON.stringify(boardDetailAdd)
      };
      
      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.code==0)
            {                
                const rownew =[...columnContext.coloumn.boardDetail,result.data];
                const columnNew = {
                    id:columnContext.coloumn.id,
                    boardDetail:rownew,
                    name:columnContext.coloumn.name,
                    columnMappingBoard:columnContext.coloumn.columnMappingBoard
                } 
                columnContext.setColumn(columnNew);
            }
            else
            {
              alert("Tạo bảng thất bại")
            }
         
        });
    }
   else
   {
     alert("bạn chưa nhập tên bảng")
   }


  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add Row</h2>
      <TextField
                fullWidth
                
                label="Content"
                name="content"
                onChange={handleChange}
                required
                value={values.content}
                variant="outlined"
               
              />
        <Button variant="contained" color="primary" onClick={AddRow} > 
          Save     
        </Button>
    
    </div>
  );

  return (
    <div>
      
      
      <Button width={1} variant="contained" onClick={handleOpen}><AddIcon></AddIcon></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}