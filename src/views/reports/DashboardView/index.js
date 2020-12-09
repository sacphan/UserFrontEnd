import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import BoardsContext from 'src/context/BoardsContext'
import APIManager from 'src/utils/LinkAPI'
import SimpleModal from 'src/views/Plugin/modal'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [userOnline, setUserOnline] = useState(Array());
  useEffect(() => {
    async function fetchBoardList() {
     debugger
      var token = JSON.parse(localStorage.getItem("Token")).token;
    
      const requestURL = APIManager+"/api/GetUserOnline";
      const requestOptions = {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        // body: JSON.stringify({ title: 'React POST Request Example' })
      };
      fetch(requestURL, requestOptions)
        .then(response => response.json()         
       )
        .then(data => 
          console.log(data));
    }

    fetchBoardList();
  }, []);
  

  return (
    userOnline
  );
};

export default Dashboard;



