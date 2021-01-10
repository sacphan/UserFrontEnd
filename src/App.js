import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from "react";
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import APIManager from 'src/utils/LinkAPI';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const isLogedIn  = useSelector((state) => state.AuthReducer.isLoggedIn);
  useEffect(() => {
    async function Init() {
      let getToken = localStorage.getItem("Token");
      if (getToken){       
        var token = JSON.parse(getToken);
        token = token.token
        const requestURL = APIManager + "/api/isLogin";
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        };              
        fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(res => 
        {
            if (res!=null)
            {
              dispatch({
                type:'LOGIN',username: res.username          
              });
            }      
        })
      }
    }
    Init();
  },[]);
 

  const routing = useRoutes(routes(isLogedIn));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
