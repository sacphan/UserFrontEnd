import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import ListChat from 'src/views/chat/ListChat';


const history = {
  avatar: 'https://i.pinimg.com/originals/06/d2/cf/06d2cfa5cd7f8fbe8e94ef5d75496a75.png',
  title: 'ViewHistory',
};
const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon, 
    title: 'Board'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile,userNameOnline }) => {
  const classes = useStyles();
  const location = useLocation();
 
  
  useEffect( () => {
    async function InitMobile(){
      if (openMobile && onMobileClose) {
        onMobileClose();
      }
    }
    InitMobile()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
 
 



  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={history.avatar}
          to="/app/account"
        />
           <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {history.title}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        {/* <List>
          {userNameOnline.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </List> */}
        <ListChat userNameOnline={userNameOnline}></ListChat>
      </Box>
      <Box flexGrow={1} />
      
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
