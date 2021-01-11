import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PasswordDialog from 'src/views/Plugin/PasswordDialog'

import {

  TextField,

} from '@material-ui/core';
import APIManager from 'src/utils/LinkAPI';
import { TrainRounded } from '@material-ui/icons';
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
  console.log(props)
  //const { boards, setBoards } = props;
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [hidden, setHidden] = React.useState(true);
  const [values, setValues] = React.useState({ Id: "" });
  const handleOpen = () => {
    setValues({ Id: "" });
    setOpen(true);
  };
  function openPasswordModal(board) {
    
    return (
      <div>
        <PasswordDialog board={board} ></PasswordDialog>
      </div>
    )
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const navigate = useNavigate();

  const joinBoard = () => {
    if (values.Id != '') {
      
      var token = JSON.parse(localStorage.getItem("Token")).token;

      const requestURL = APIManager + "/api/Board/JoinBoard";
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
          if (result.code == 0) {
            navigate(`/app/BoardGame/${values.Id}`, { replace: true });
          }
          else {
            if (result.message == "Has password") {
              setHidden(false)
            }
            else {
              alert(result.message)
            }
          }

        });
    }
    else {
      alert("Bạn chưa nhập room Id")
    }

  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <h2 style={{ marginTop: "2px", display: "flex", justifyContent: "center" }} id="simple-modal-title">Create room</h2>
      </div>
      <TextField
        fullWidth
        label="Id Room"
        name="Id"
        onChange={handleChange}
        required
        value={values.Id}
        variant="outlined"
      />
      <TextField     
        fullWidth
        style = {hidden ? {display :"none"} : {display:""}} 
        label="Password"
        name="password"
        onChange={handleChange}
        value={values.password}
        variant="outlined"
      />
      <div style={{ marginTop: "5px", display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={joinBoard} >
          Join Room <SportsEsportsIcon></SportsEsportsIcon>
        </Button>
      </div>

    </div>
  );

  return (
    <div style={{ display: "inline", paddingLeft: "5px" }}>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FindInPageIcon></FindInPageIcon> Room
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