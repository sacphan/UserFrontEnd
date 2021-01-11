import './css/RoomGame.css';
import React, { useState } from 'react';
import Square from './Square'
export default function Board(props) { 
    const renderSquare = (i) =>{      
        return <Square HightLine={props.HightLine && props.HightLine.includes(i)} key={i} value={props.squares[i]} onClick={()=> props.onClick(i)} />;     
    } 
      const boardSize = 20;
      let boards  = [];
      for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
          row.push(renderSquare(i * boardSize + j));
        }       
        boards.push(<div key={i} className="board-row">{row}</div>);  
      } 
      return (
        <div>
          <div className="status">{props.status}</div>
          {boards}
        </div>
      );
    
  }