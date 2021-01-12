import './css/RoomGame.css';
import React, { useState, useRef } from 'react';
import Board from './Board'
import TimerIcon from '@material-ui/icons/Timer';
import ChatBox from "../DetailBoard/ChatBox"
export default function Game(props) {

  const startRef = useRef(null)
  const xinhoaRef = useRef(null)
  const ggRef = useRef(null)


  const [historys, setHistorys] = useState([{ squares: Array(400).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);
  const [sortHistory, setsortHistory] = useState(true);
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          Winner: squares[a],
          HightLine: lines[i]
        };
      }
    }
    return {
      Winner: null,
      HightLine: null
    };
  }
  const handleClick = (i) => {
    const history = historys.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //const stepNumber = history.length;
    if (calculateWinner(squares).Winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistorys(history.concat([{
      squares: squares
    }]));
    setStepNumber(stepNumber + 1);
    setxIsNext(!xIsNext);
  }
  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);

  }
  const sortHistoryFunc = () => {
    setsortHistory(!sortHistory)
  }

  const history = historys;
  const current = history[stepNumber];


  const calculateWinnerInfo = calculateWinner(current.squares);
  const winner = calculateWinnerInfo.Winner;


  const moves = history.map((step, move) => {

    const row = Math.floor((move - 1) / 20);
    const col = (move - 1) % 20;
    const bold = move === stepNumber ? "bold" : "";
    const desc = move ? `Go to move #${move} [${row},${col}]` : 'Go to game start';
    return (
      <li key={move}>
        <button className={bold} onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  })
  if (!sortHistory) {
    moves.reverse();
  }
  let status;
  if (winner) {
    status = `Winner: ${winner}`
  }
  else {

    if (history.length === 200 && stepNumber == 199) {
      status = 'Draw'
    }
    else
      status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <div className="game" style={{ minWidth: 980 }}>
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} HightLine={calculateWinnerInfo.HightLine} />
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

          <span ref={startRef} onClick={() => {
            ggRef.current.style.opacity = 1
            startRef.current.style.opacity = 0
          }} style={{ display: 'flex', justifyContent: 'center', opacity: 1 }} >
            <span className="btn-right" style={{ backgroundColor: "rgb(59, 218, 28)" }}>Bắt đầu</span>
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
        <ChatBox />
      </div>

    </div>
  );

}