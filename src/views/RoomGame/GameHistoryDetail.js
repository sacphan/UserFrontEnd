import './css/RoomGame.css';
import React, { useState, useRef,useEffect } from 'react';
import Board from './Board'
import TimerIcon from '@material-ui/icons/Timer';

import { useDispatch,useSelector } from 'react-redux'
import APIManager from 'src/utils/LinkAPI';
import {MessageBox} from "../DetailBoard/ChatBox"
import { makeStyles } from '@material-ui/core/styles';


import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
export default function Game(props)  {
  
  const startRef = useRef(null)
  const xinhoaRef = useRef(null)
  const ggRef = useRef(null)
    const [historys,setHistorys] = useState([{squares: Array(400).fill(null)}],)
    //const [stepNumber,setStepNumber] = useState(0);
    const [xIsNext,setxIsNext] = useState(true);
    const [sortHistory,setsortHistory] = useState(true);
   
    const winner =  useSelector((state) => state.GameReducer.Winner);
    const hightLine = useSelector((state) => state.GameReducer.HightLine);
    const IdUserCurrent= useSelector((state) => state.AuthReducer.id);
    
    const UserName = useSelector((state) => state.AuthReducer.userName);
  
    const {game,setGame}=props;
    
    
    const [connection,setConnection]=useState();
    let value = -1;
let backupvalue = -1;
    const MaxHeight = 20;
      const MaxWidth = 20;
      //Mở Socket
    
  
  
   
 
 
    
  

  const jumpTo = (step) => {
    //setStepNumber(step);
    setxIsNext(step % 2 === 0);

  }
  const sortHistoryFunc = () => {
    setsortHistory(!sortHistory)
  }
 
    
  
 
  const history = historys;
  const stepNumber=0;
  let current = history[game];
  if (stepNumber<= (history.length -1))
  {
     current = history[stepNumber];
  }
 
  const moves = history.map((step,move) => {
    
    const row = Math.floor((move-1)/20);
    const col =  (move-1) % 20;
    const bold = move===stepNumber ? "bold" : "";
    const desc = move ? `Go to move #${move} [${row},${col}]` : 'Go to game start';
    return (
      <li key={move}>
        <button className={bold} onClick ={()=>jumpTo(move)}>{desc}</button>
      </li>
    );
  })
  if (!sortHistory)
  {
    moves.reverse();
  }
  let status;
  if (winner)
  {
    status = `Winner: ${winner}` 
  }
  else  
  {
    
    if (history.length === 200 )
    {
      status = 'Draw'
    }
    else
      status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  
  return (
    <div className="game" style={{ minWidth: 980 }}>
      <div className="game-board">
        <Board squares={historys.squares}  HightLine={hightLine} />
      </div>
      <div className="wrap-right">
        <div className="game-info">
          <div className="wrap-time">
            <span className="time-down">
              <TimerIcon />
            9
              </span>
          </div>


          <div style={{ margin: "10px 0px", display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <span>
              <img className="img-player" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" />
            </span>
            <span style={{ fontSize: 40, fontWeight: "bold", display: 'flex', alignItems: "center", margin: "0px 10px" }}>X</span>
            <span>
              <img className="img-player" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" />
            </span>


          </div>

          <span  ref={startRef} onClick={()=>{
             
             
            
          }} style={{ display: 'flex', justifyContent: 'center', opacity: 1 }} >
            <span className="btn-right" style={{ backgroundColor: "rgb(59, 218, 28)" }}>{IdUserCurrent==game.userId1?"Bắt đầu":"Sẵn sàng"}</span>
          </span>

          <div ref={ggRef} style={{ opacity: 0, display: 'flex', justifyContent: 'space-between' }}>
            <span onClick={() => {
              ggRef.current.style.opacity = 0
              startRef.current.style.opacity = 1
            }
            } className="btn-right" style={{ backgroundColor: "yellow" }}>Xin hòa</span>
            <span onClick={() => {
              ggRef.current.style.opacity = 0
              startRef.current.style.opacity = 1
            }
            } className="btn-right" style={{ backgroundColor: "red" }}>Đầu hàng</span>

          </div>


        </div>
        <MessageBox game={game} IdUserCurrent={IdUserCurrent} connection={connection} turn={historys.Turn}/>
      </div>

    </div>
  );

}