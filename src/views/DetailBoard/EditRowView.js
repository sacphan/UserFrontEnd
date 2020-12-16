import EditIcon from '@material-ui/icons/Edit';
import React, { useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import BoardsContext from 'src/context/BoardsContext';
import ColumnContext from 'src/context/ColumnContext';
import RowContext from 'src/context/RowContext'
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
  
  const rowContext = useContext(RowContext);
    const rowCurrent = props.rowCurrent;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values,setValues] = React.useState({content:""});
  const boardContext = useContext(BoardsContext);
  const handleOpen = () => {
      
    setValues({id:rowCurrent.id,content:rowCurrent.content});
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
  const saveBoard = ()=>{
    if (values.content!='')
    {
      handleClose();
      var token = JSON.parse(localStorage.getItem("Token")).token;
        
      const requestURL = APIManager+"/api/BoardController/editBoardDetail";
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'My-Custom-Header': 'foobar'
        },
         body: JSON.stringify(values)
      };
      
      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.code==0)
            {     
                 const rowNew ={
                   id:rowContext.row.id,
                   content:result.data.content,
                   ColumnId:rowContext.row.coloumnid,
                   BoardId:rowContext.row.boardid
                 }
                 rowContext.setRow(rowNew)
            }
            else
            {
              alert("sửa nội dung thất bại")
            }
         
        });
    }
   else
   {
     alert("bạn chưa nhập nội dung")
   }

  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add Board</h2>
      <TextField
                fullWidth
                
                label="content"
                name="content"
                onChange={handleChange}
                required
                value={values.content}
                variant="outlined"
               
              />
        <Button variant="contained" color="primary" onClick={saveBoard} > 
          Save     
        </Button>
    
    </div>
  );

  return (
    <div>
      
      
      <Button 
       onClick={handleOpen}>
         <EditIcon mt={10} style={{maxWidth: '15px', maxHeight: '15px', minWidth: '15px', minHeight: '15px'}}></EditIcon>
         </Button> 
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