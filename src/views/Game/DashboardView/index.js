import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import BoardGame from './BoardGame';
import BoardsContext from 'src/context/BoardsContext'
import APIManager from 'src/utils/LinkAPI'
import SimpleModal from 'src/views/Plugin/modal'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ModalJoinRoom from 'src/views/Game/DashboardView/ModaleJoinRoom'
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
  const navigate = useNavigate();
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
  const joinBoardNow = () => {
    {
      debugger
      var token = JSON.parse(localStorage.getItem("Token")).token;

      const requestURL = APIManager + "/api/Board/JoinBoardNow";
      const requestOptions = {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'My-Custom-Header': 'foobar'
        },
      };

      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.code == 0) {
            navigate(`/app/BoardGame/${result.data.id}`, { replace: true });
          }
          else {
            if (result.message == "Has password") {
            }
            else {
              alert(result.message)
            }
          }

        });
    }


  }
  const renderBoard = (item) => {
    if (item.password != null) {
      return <Grid key={item.id} item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <BoardGame board={item} />
      </Grid>
    }
    return <Grid key={item.id} item
      lg={3}
      sm={6}
      xl={3}
      xs={12}
    >
      <BoardGame board={item} />
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
          <div>
            <SimpleModal boards={boards} setBoards={setBoards} />
            <ModalJoinRoom></ModalJoinRoom>
            <div style={{display: "inline", paddingLeft: "5px" }}>
              <Button variant="contained" color="primary" onClick={joinBoardNow} >
                Chơi nhanh <SportsEsportsIcon></SportsEsportsIcon>
              </Button>
            </div>
          </div>
          <br />
          <Grid
            container
            spacing={3}
          >
            {listBoard}

          </Grid>
        </Container>
      </Page>
    </BoardsContext.Provider>
  );
};

export default Dashboard;