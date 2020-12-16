import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import BoardsContext from 'src/context/BoardsContext'
import APIManager from 'src/utils/LinkAPI'
import SimpleModal from 'src/views/Plugin/modal'
import ChatSignalR from 'src/views/chat/Chat-SignalR'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    position: "relative"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [boards, setBoards] = useState(Array());
  let listBoard = [];
  useEffect(() => {
    async function fetchBoardList() {

      var token = JSON.parse(localStorage.getItem("Token")).token;
      const requestURL = APIManager + "/api/GetListBoardBlank";
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(data => setBoards(data.data));
    }

    fetchBoardList();
  }, []);
  const renderBoard = (item) => {

    return <Grid key={item.id} item
      lg={3}
      sm={6}
      xl={3}
      xs={12}
    >
      <Budget board={item} />
    </Grid>

  }

  boards.map((item) => {

    listBoard.push(renderBoard(item));
  })

  return (
    <BoardsContext.Provider value={{
      boards: boards,
      setBoards: setBoards
    }}>
      <Page
        className={classes.root}
        title="Dashboard"
      >

        <Container maxWidth={false}>

          <SimpleModal boards={boards} setBoards={setBoards} />

          <br />
          <Grid
            container
            spacing={3}
          >
            {listBoard}

          </Grid>


        </Container>
        <ChatSignalR />
      </Page>
    </BoardsContext.Provider>
  );
};

export default Dashboard;