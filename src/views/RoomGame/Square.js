import './css/RoomGame.css';
import React, { useState } from 'react';

export default function Square(props)  {

      const classname = props.HightLine ? "square squareHightLine":"square"
      return (
        <button className={classname} onClick={props.onClick}>
          {props.value} 
        </button>
      );
  
  }