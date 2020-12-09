import React, { useState,useEffect  } from 'react';
import { useParams } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import APIManager from 'src/utils/LinkAPI';
import ColumnView from 'src/views/DetailBoard/ColumnView';
import BoardDetailContext from 'src/context/BoardDetailContext';
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

const BoardDetailView = ( ) => {
 
  const classes = useStyles();

  const [boardDetail,setBoardDetail] = useState(Array());
  const params = useParams();


  useEffect(() => {
    async function fetchBoardList() {         
      const {id} = params;
      const token = JSON.parse(localStorage.getItem("Token")).token;
    
    
      const requestURL = APIManager+`/api/BoardController/getListBoardDetail/${id}`;
      const requestOptions = {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        // body: JSON.stringify({ title: 'React POST Request Example' })
      };

      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.code==0)
          {
           
            setBoardDetail(result.data);
          }
           
           
        });
    }

    fetchBoardList();
  }, []);
  let listGrid=[];

  
  boardDetail.map((item)=>{       
    listGrid.push(<ColumnView key={item.id} columnCurrent={item} ></ColumnView>);
  
    })
  return (
    <BoardDetailContext.Provider value={{
      boardDetail:boardDetail,
      setboardDetail:setBoardDetail
    }}>
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
         
        </Grid>
       {listGrid}
      
      
      </Grid>
    </div>
    </BoardDetailContext.Provider>
  );
  
};

export default BoardDetailView;
