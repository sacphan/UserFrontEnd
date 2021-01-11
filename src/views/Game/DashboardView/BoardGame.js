import React,{useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditModal from 'src/views/Plugin/EditModal';
import LockIcon from '@material-ui/icons/Lock'
import PeopleIcon from '@material-ui/icons/People';
import PasswordDialog from 'src/views/Plugin/PasswordDialog'
import LockOpenIcon from '@material-ui/icons/LockOpen';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));


const BoardGame = ({ className, ...rest }) => {
  
  const classes = useStyles();
  const {Name,setName} = useState('');
  const {board} = rest;
  const navigate = useNavigate();
  const JoinGame = ()=>{
    
    navigate(`/app/BoardGame/${board.id}`, { replace: true });
  }
  let html='';
  const handleChange = (event) => {
    setName({
      ...Name,
      [event.target.name]: event.target.value
    });
  };
  if (board.name=='')
  {
    html= <TextField
    fullWidth
    helperText="Please specify the  name board"
    label="Name Board"
    name="name"
    onChange={handleChange}
    required
    value={board.name}
    variant="outlined"
  />
  }
  if (board.password!=null && board.password != ""){
    return(
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3} 
        >
          <Grid item >
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              ID:{board.id}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              
            </Typography>
          </Grid >
          <div>         
             <PeopleIcon></PeopleIcon>{board.status}
</div>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <LockIcon></LockIcon>
          <PasswordDialog  board={board} ></PasswordDialog>
        </Box>
      </CardContent>
    </Card>
    )
  }
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3} 
        >
          <Grid item >
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              ID:{board.id}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              
            </Typography>
          </Grid >
          <div>         
             <PeopleIcon></PeopleIcon>{board.status}
</div>

        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <LockOpenIcon></LockOpenIcon>
          <Button  color="primary" onClick={JoinGame}>
            Join
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

BoardGame.propTypes = {
  className: PropTypes.string
};

export default BoardGame;
