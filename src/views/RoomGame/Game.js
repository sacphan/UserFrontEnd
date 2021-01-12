import './css/RoomGame.css';
import React, { useState, useRef } from 'react';
import Board from './Board'
import TimerIcon from '@material-ui/icons/Timer';
import ChatBox from "../DetailBoard/ChatBox"
import { useDispatch,useSelector } from 'react-redux'
export default function Game(props)  {
  const startRef = useRef(null)
  const xinhoaRef = useRef(null)
  const ggRef = useRef(null)
    const [historys,setHistorys] = useState([{squares: Array(400).fill(null)}])
    const [stepNumber,setStepNumber] = useState(0);
    const [xIsNext,setxIsNext] = useState(true);
    const [sortHistory,setsortHistory] = useState(true);
    const dispatch = useDispatch();
    const winner =  useSelector((state) => state.GameReducer.Winner);
    const hightLine = useSelector((state) => state.GameReducer.HightLine);
    let value = -1;
let backupvalue = -1;
    const MaxHeight = 20;
      const MaxWidth = 20;
    const isBlock2Ends = (squares, type, competitor) => {
      const row = Math.floor(value / 20);
      const column = value % 20;
      let hasCompetitor = false;
  
      switch (type) {
        // Chặn 2 đầu ngang
        case 'horizontal':
          for (let i = column - 1; i >= 0; i -= 1) {
            if (squares[row * MaxWidth + i] === competitor) {
              hasCompetitor = true;
              break;
            }
          }
  
          if (hasCompetitor) {
            for (let i = column + 1; i < MaxWidth; i += 1) {
              if (squares[row * MaxWidth + i] === competitor) {
                return true;
              }
            }
          } else {
            return false;
          }
  
          break;
  
        // Chặn 2 đầu dọc
        case 'vertical':
          for (let i = row - 1; i >= 0; i -= 1) {
            if (squares[i * MaxWidth + column] === competitor) {
              hasCompetitor = true;
              break;
            }
          }
  
          if (hasCompetitor) {
            for (let i = row + 1; i < MaxHeight; i += 1) {
              if (squares[i * MaxWidth + column] === competitor) {
                return true;
              }
            }
          } else {
            return false;
          }
  
          break;
  
        // Chặn 2 đầu chéo "/"
        case 'slash':
          for (let i = 1; row + i < MaxHeight - 1 && column - i >= 0; i += 1) {
            if (squares[(row + i) * MaxWidth + column - i] === competitor) {
              hasCompetitor = true;
              break;
            }
          }
  
          if (hasCompetitor) {
            for (let i = 1; row - i >= 0 && column + i < MaxWidth; i += 1) {
              if (squares[(row - i) * MaxWidth + column + i] === competitor) {
                return true;
              }
            }
          } else {
            return false;
          }
          break;
  
        // Chặn 2 đầu chéo "\"
        case 'backslash':
          for (let i = 1; row - i >= 0 && column - i >= 0; i += 1) {
            if (squares[(row - i) * MaxWidth + column - i] === competitor) {
              hasCompetitor = true;
              break;
            }
          }
  
          if (hasCompetitor) {
            for (
              let i = 1;
              row + i < MaxHeight && column + i < MaxWidth;
              i += 1
            ) {
              if (squares[(row + i) * MaxWidth + column + i] === competitor) {
                return true;
              }
            }
          } else {
            return false;
          }
          break;
        default:
          break;
      }
  
      return false;
    };
  
    function calculateWinner(squares) {
      if (value === -1) {
        return {
          Winner: null,
          HightLine:null
        }
      }

      const row = Math.floor(value / 20);
      const column = value % 20;
  
      const thisValue = squares[row * 20 + column];
      // console.log(squares);
      let winLine = Array(5).fill(null);
      // // Kiểm tra hàng dọc chứa điểm vừa đánh
      for (let index = row - 4; index <= row; index += 1) {
        winLine = Array(5).fill(null);
        // Nếu ô row + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
        if (index < 0) {
          // continue;
        }
  
        // Trường hợp đủ 5 con trong bàn cờ
        let isWon = true;
  
        for (let i = index; i < index + 5; i += 1) {
          winLine[i - index] = i * MaxWidth + column;
          // console.log(squares[i * MaxWidth + column])
          if (i > MaxHeight - 1) {
            isWon = false;
            break;
          }
  
          if (squares[i * MaxWidth + column] !== thisValue) {
            isWon = false;
            break;
          }
        }
  
        if (
          isWon === true &&
          !isBlock2Ends(squares, 'vertical', thisValue === 'X' ? 'O' : 'X')
        ) {
         
          return {
            Winner: thisValue,
            HightLine:winLine
          }
        }
      }
  
      // // Kiểm tra hàng ngang chứa điểm vừa đánh
      for (let index = column - 4; index <= column; index += 1) {
        winLine = Array(5).fill(null);
        if (index < 0) {
          break;
        }
  
        // Nếu ô column + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
        if (index < 0) {
          // continue;
        }
  
        // Trường hợp đủ 5 con trong bàn cờ
        let isWon = true;
        for (let i = index; i < index + 5; i += 1) {
          winLine[i - index] = row * MaxWidth + i;
          if (i > MaxWidth - 1) {
            isWon = false;
            break;
          }
          if (squares[row * MaxWidth + i] !== thisValue) {
            isWon = false;
            break;
          }
        }
  
        if (
          isWon === true &&
          !isBlock2Ends(squares, 'horizontal', thisValue === 'X' ? 'O' : 'X')
        ) {
         
          return {
            Winner: thisValue,
            HightLine:winLine
          }
        }
      }
  
      // // Kiểm tra hàng chéo từ trái qua, trên xuống chứa điểm vừa đánh
  
      for (let index = -4; index <= 0; index += 1) {
        winLine = Array(5).fill(null);
  
        // Nếu ô column + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
        if (index + column < 0 || index + row < 0) {
          // continue;
        }
  
        // Trường hợp đủ 5 con trong bàn cờ
        let isWon = true;
        for (let i = index; i < index + 5; i += 1) {
          winLine[i - index] = (row + i) * MaxWidth + (column + i);
          if (i + column > MaxWidth - 1 || i + row > MaxHeight - 1) {
            isWon = false;
            break;
          }
  
          if (squares[(row + i) * MaxWidth + (column + i)] !== thisValue) {
            isWon = false;
            break;
          }
        }
  
        if (
          isWon === true &&
          !isBlock2Ends(squares, 'backslash', thisValue === 'X' ? 'O' : 'X')
        ) {
        
          return {
            Winner: thisValue,
            HightLine:winLine
          }
        }
      }
  
      // // Kiểm tra hàng chéo từ trái qua, dưới lên chứa điểm vừa đánh
  
      for (let index = -4; index <= 0; index += 1) {
        winLine = Array(5).fill(null);
  
        // Nếu ô column + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
        if (index + column < 0 || row - index > MaxHeight - 1) {
          // continue;
        }
  
        // Trường hợp đủ 5 con trong bàn cờ
        let isWon = true;
        for (let i = index; i < index + 5; i += 1) {
          winLine[i - index] = (row - i) * MaxWidth + (column + i);
          if (i + column > MaxWidth - 1 || row - i < 0) {
            isWon = false;
            break;
          }
  
          if (squares[(row - i) * MaxWidth + (column + i)] !== thisValue) {
            isWon = false;
            break;
          }
        }
  
        if (
          isWon === true &&
          !isBlock2Ends(squares, 'slash', thisValue === 'X' ? 'O' : 'X')
        ) {
         
          return {
            Winner: thisValue,
            HightLine:winLine
          }
        }
      }
  
      return {
        Winner: null,
        HightLine:null
      }
    }
    const handleClick = (i) =>
    {
      const history = historys.slice(0,stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      
      value=i;
      backupvalue = value;
      //const stepNumber = history.length;
      
      if (winner||squares[i])
      {
        return;
      }
      squares[i] =xIsNext ? 'X' : 'O';
      var resultWinnerCal = calculateWinner(squares);
      
      if (resultWinnerCal.Winner)
      {
        dispatch({
          type: 'Winner', Winner: resultWinnerCal.Winner,HightLine:resultWinnerCal.HightLine
        });
      }
      
      
      setHistorys(history.concat([{
        squares:squares}]));
        setStepNumber( stepNumber+1);
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
    <div className="game" style={{ minWidth: 980 }}>
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} HightLine={hightLine} />
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