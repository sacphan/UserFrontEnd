import React, { useState,useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import Game from 'src/views/RoomGame/Game'
import { makeStyles } from '@material-ui/core/styles';
import APIManager from 'src/utils/LinkAPI';
import { set } from 'lodash';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const BoardDetailView = ( ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [start,setStart]=React.useState(false);
  const [ready,setReady]=React.useState(false);
  const [game,setGame]= useState({userId1:0,userId2:0,userId1Navigation:{username:''},userId2Navigation:{username:''}});
  const params = useParams();
  useEffect(() => {
    async function Init() {
      let getToken = localStorage.getItem("Token");
      if (getToken){       
        var token = JSON.parse(getToken);
        token = token.token
        const requestURL = APIManager + "/api/isLogin";
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        };              
        fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(res => 
        {
            if (res!=null)
            {
              debugger
              dispatch({
                type:'LOGIN',username: res.username,id:res.id          
              });
            }      
        })
      }
    }
    Init();
    async function GetGameByBoardId() {         
      const id = params.id;
     
      const token = JSON.parse(localStorage.getItem("Token")).token;
      const requestURL = APIManager+`/api/GetGameByBoardId`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }

        ,body: JSON.stringify(id)
      };
      
      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.code==0)
          {          
            setGame(result.data);
            console.log(result.data)
          }
          else {
            alert(result.message);
            navigate(`/app/dashboard/`, { replace: true });
          } 
           
        });
    }

    GetGameByBoardId();
  }, []);
  
  return (
    <div style={{overflowX: 'hidden'}}>
   <Game start={start} setStart={setStart} ready={ready} setReady={setReady} game={game} setGame={setGame}></Game>
  {/* <ChatBox></ChatBox> */}
    </div>
  );
  
};

export default BoardDetailView;
