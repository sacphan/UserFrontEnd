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
import RowContext from 'src/context/RowContext';
import ColumnContext from 'src/context/ColumnContext';
import ColumnView from './ColumnView';
export default function DeleteRowView() {
    const rowContext = useContext(RowContext);
    const coloumnContext = useContext(ColumnContext);
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
    const requestURL = APIManager+"/api/BoardController/deleteBoardDetail";
    const requestOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        
      },
      body:JSON.stringify(rowContext.row)
    };
    fetch(requestURL, requestOptions)
      .then(response => response.json())
      .then(data =>{
        if (data.code==0)
        {
            
            const indexDelete = coloumnContext.coloumn.boardDetail.indexOf(rowContext.row);
            const rownew =[...coloumnContext.coloumn.boardDetail.slice(0,indexDelete),...coloumnContext.coloumn.boardDetail.slice(indexDelete+1)];
            const columnNew = {
                id:coloumnContext.coloumn.id,
                boardDetail:rownew,
                name:coloumnContext.coloumn.name,
                columnMappingBoard:coloumnContext.coloumn.columnMappingBoard
            } 
            coloumnContext.setColumn(columnNew);
           
        }
        else
        {
            alert(data.data)
        }
       
      } );
    handleClose();
  }
   
  
  return (
    <div>
      <Button  onClick={handleClickOpen}>
      <DeleteIcon style={{maxWidth: '15px', maxHeight: '15px', minWidth: '15px', minHeight: '15px'}}/>
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