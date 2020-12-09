import React, { useState,useEffect,useContext  } from 'react';

import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import BoardDetailContext from 'src/context/BoardDetailContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RowView from 'src/views/DetailBoard/RowView';
import AddRowView from 'src/views/DetailBoard/AddRowView';
import ColumnContext from 'src/context/ColumnContext';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
  const ColumnView = (props) => {
    const boardDetailContext = useContext(BoardDetailContext);
    const [coloumn,setColumn] = useState(props.columnCurrent);
   
    const classes = useStyles();
    
    let listBoardDetail  = [];
    coloumn.boardDetail.map((item)=>{
        listBoardDetail.push(<RowView key={item.id} rowCurrent = {item}></RowView>  )
    })
  
     
      return <ColumnContext.Provider value={{
          coloumn:coloumn,
          setColumn : setColumn}}>
        <Grid key={coloumn.id}  item  xs={6} sm={4}  >   
      <Paper key={coloumn.id} className={classes.paper}><b>{coloumn.name}</b></Paper>
      <br/>      
      <AddRowView ></AddRowView>
      {listBoardDetail}
    </Grid>
    </ColumnContext.Provider>
  }
  export default ColumnView;  