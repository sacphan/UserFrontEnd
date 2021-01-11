import './css/RoomGame.css';
import React, { useState } from 'react';
import Board from './Board'
export default function Game(props)  {
    
    const [historys,setHistorys] = useState([{squares: Array(400).fill(null)}])
    const [stepNumber,setStepNumber] = useState(0);
    const [xIsNext,setxIsNext] = useState(true);
    const [sortHistory,setsortHistory] = useState(true);
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
              HightLine:lines[i]
            };
          }
        }
        return {
          Winner: null,
          HightLine:null
        };
      }
    const handleClick = (i) =>
    {
      const history = historys.slice(0,stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      //const stepNumber = history.length;
      if (calculateWinner(squares).Winner || squares[i])
      {
        return;
      }
    
      squares[i] =xIsNext ? 'X' : 'O';
      setHistorys(history.concat([{
        squares:squares}]));
        setStepNumber( stepNumber+1);
        setxIsNext(!xIsNext);   
    }
    const jumpTo = (step) =>
    {
        setStepNumber(step);
        setxIsNext(step % 2 === 0);
        
    }
    const sortHistoryFunc = () =>
    {         
      setsortHistory(!sortHistory)     
    }
    
      const history = historys;
      const current = history[stepNumber];
     
     
       const calculateWinnerInfo = calculateWinner(current.squares);
      const winner = calculateWinnerInfo.Winner; 
      
      
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
        
        if (history.length === 200 && stepNumber==199)
        {
          status = 'Draw'
        }
        else
          status = `Next player: ${xIsNext ? "X" : "O"}`;
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares ={current.squares}  onClick ={(i)=> handleClick(i)} HightLine={calculateWinnerInfo.HightLine}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol><button onClick={()=>sortHistoryFunc()}>Sort</button></ol>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    
  }