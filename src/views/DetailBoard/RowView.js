import React, { useContext,useState  } from 'react';

import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import BoardDetailContext from 'src/context/BoardDetailContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EditRow from 'src/views/DetailBoard/EditRowView'
import DeleteRow from 'src/views/DetailBoard/DeleteRowView'
import RowContext from 'src/context/RowContext'
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

  const RowView = (props) => {
  
    const classes = useStyles();    
    const [row,setRow] = useState(props.rowCurrent);
      return  <RowContext.Provider value={{
        row:row,
          setRow : setRow
      }}>
                <br/>          
          <Paper className={classes.paper}><Grid container >
        <Grid item xs={8}>
        {row.content}
        </Grid>
        <Grid item xs={2}>
        <EditRow rowCurrent={row}></EditRow>
        </Grid>
        <Grid item xs={2}>
        <DeleteRow ></DeleteRow>
        </Grid>
        </Grid>
        </Paper>
       
      
      
      
                  
                
  </RowContext.Provider>
  }
  export default RowView;  