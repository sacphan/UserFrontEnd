import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Clear';
import BoardsContext from 'src/context/BoardsContext';
import APIManager from 'src/utils/LinkAPI';
export default function AlertDialog(props) {
    const {boardCurrent} = props;
  const [open, setOpen] = React.useState(false);
  const boardContext = useContext(BoardsContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = ()=>
  {
    const token = JSON.parse(localStorage.getItem("Token")).token;
    const requestURL = APIManager+"/api/BoardController/delete/"+boardCurrent.id;
    const requestOptions = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    fetch(requestURL, requestOptions)
      .then(response => response.json())
      .then(data =>{
        
        const indexDelete = boardContext.boards.indexOf(boardCurrent);
        boardContext.setBoards([...boardContext.boards.slice(0,indexDelete),...boardContext.boards.slice(indexDelete+1)])
      } );
    handleClose();
  }
   
  
  return (
    <div>
      <Button  onClick={handleClickOpen}>
      <DeleteIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa bảng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}