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
  debugger
  const dispatch = useDispatch();
 
  useEffect(async () => {

    var token = JSON.parse(localStorage.getItem("Token"));
    if (token != null){
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
          console.log(res)
            dispatch({
              type:'LOGIN',username: res.username          
            });
          
    
      })
    }
    return (<div></div>)
  }, []);
  const isLoggedIn  = useSelector((state) => state.AuthReducer.isLoggedIn);

  const routing = useRoutes(routes(isLoggedIn));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
