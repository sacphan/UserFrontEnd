import React,{useState} from 'react';
import 'src/App.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { blue } from '@material-ui/core/colors';
import APIManager from 'src/utils/LinkAPI';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {

  const board = props.board
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const navigate = useNavigate();

  const JoinGame = ()=>{
      
    var token = JSON.parse(localStorage.getItem("Token"));
    var pass = document.getElementById("password").value;
    board.password = pass;
    if (token != null){
      token = token.token
      const requestURL = APIManager + "/api/Board/JoinBoard";
      const requestOptions = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(board) 
      };
      fetch(requestURL, requestOptions)
      .then(response => response.json())
      .then (res => {
          if (res.code == 0){
            navigate(`/app/BoardGame/${board.id}`, { replace: true });
          }
          else {
              alert (res.message);
          }
      })
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Enter Password</DialogTitle>
      <List>
          <ListItem>
           <input className= "myInput" id ="password" ></input>
          </ListItem>
          <Button onClick={JoinGame} >Join</Button>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const board = props.board
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Join
      </Button>
      <SimpleDialog board = {board}  open={open} onClose={handleClose} />
    </div>
  );
}