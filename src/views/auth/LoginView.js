import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { result } from 'lodash';
import APIManager from 'src/utils/LinkAPI';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
  
}));
debugger
const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
  
    const LoginFacebook={
      Email:response.email,
      Name:response.name,
      FacebookId:response.id
    }
    console.log(LoginFacebook)

    fetch(APIManager+'/api/loginFacebook', {
      method: 'post',
      headers: {
      
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(LoginFacebook)
    })
    .then(response => response.json())
    .then(result => {
       if (result.code==0) 
       {
           localStorage.setItem("Token",JSON.stringify(result.data))
         
          navigate('/app/dashboard', { replace: true });
       }
       else{
         alert(`${result.message}`)
       }
    }

     );
  }
  const responseGoogle = (response) => {
    const loginGoogle={
      Email:response.profileObj.email,
      Name:response.profileObj.name,
      GoogleId:response.profileObj.googleId
    }
    console.log(response)

    fetch(APIManager+'/api/loginGoogle', {
      method: 'post',
      headers: {
      
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(loginGoogle)
    })
    .then(response => response.json())
    .then(result => {
       if (result.code==0) 
       {
           localStorage.setItem("Token",JSON.stringify(result.data))
           dispatch({
             type:'LOGIN'           
           });
          navigate('/app/dashboard', { replace: true });
       }
       else{
         alert(`${result.message}`)
       }
    }

     );
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().min(2,'Too Short').max(70).required('Too Long'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {       
                const login = JSON.stringify({'username': values.username, 'password': values.password })
                fetch(APIManager+'/api/login', {
                 method: 'post',
                 headers: {                 
                   'Content-Type': 'application/json'
                 },
                 body: login
               })
               .then(response => response.json())
               .then(result => {
                  if (result.code==0) 
                  {
                      localStorage.setItem("Token",JSON.stringify(result.data))
                      dispatch({
                        type:'LOGIN'
                        
                      });
                      dispatch({
                        type:'LOGIN',username: values.username          
                      });
                     navigate('/app/dashboard', { replace: true });
                  }
                  else{
                    alert(`${result.message}`)
                  }
               }

                );
             
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                      
                     <FacebookLogin
                        appId="805757080210462"                       
                        fields="name,email,picture"
                       
                        callback={responseFacebook}
                        render={renderProps => (
                          <Button
                          color="primary"
                          fullWidth
                          
                           startIcon={<FacebookIcon />}
                           onClick={renderProps.onClick}s
                          size="large"
                          variant="contained"
                        >
                         
                         Login with Facebook
                        </Button>
  )} 
/>

                   
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                     <GoogleLogin
    clientId="150788904130-4n1uafts882g9bcd9l6eqsl1omk1kspv.apps.googleusercontent.com"
    render={renderProps => (
      
      <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={renderProps.onClick}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
      )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
                  
                  </Grid>
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with username
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="UserName"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    //disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
