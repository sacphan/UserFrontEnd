import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import APIManager from 'src/utils/LinkAPI';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({name}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userInfo,setUserInfo] = React.useState({username:'',cup:'',rank:'',rateWin:'',totalGame:'',createDate:''});
  const handleOpen = () => {
    setOpen(true);
    let getToken = localStorage.getItem("Token");
    if (getToken){
     
      var token = JSON.parse(getToken);
      token = token.token
      const requestURL = APIManager + "/api/GetInfoByUserName";
   
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify( name )
      };         
      fetch(requestURL, requestOptions)
      .then(response => response.json())
      .then(res => 
      {
          if (res!=null)
          {
            console.log(res);
            setUserInfo(res);
            
          }
             
      })
  }
}

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <ListItem button onClick={handleOpen}>
           <ListItemIcon>
           <img src={require('src/iconSVG/iconOnline.svg')} /> 
           </ListItemIcon>      
           <ListItemText primary={name} />      
         </ListItem>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Thông tin người chơi</h2>
            <p id="transition-modal-description">Tên: {userInfo.username}</p>
            <p id="transition-modal-description">Ngày tham gia: {userInfo.createDate}</p>
            <p id="transition-modal-description">Số trận đã chơi: {userInfo.totalGame}</p>
            <p id="transition-modal-description">Tỉ lệ thắng: {userInfo.rateWin}</p>
            <p id="transition-modal-description">Cấp bậc: {userInfo.rank}</p>      
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
