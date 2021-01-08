import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
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
    .then(response => 
    {
        if (response.status==200)
        {
          response.json();
          dispatch({
            type:'LOGIN'           
          });    
        }
  
    })
  }
 
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
