import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import APIManager from 'src/utils/LinkAPI';
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListGameView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [rows, setRows] = useState([])
  const { id } = params;
  useEffect(() => {
    async function Init() {
      let getToken = localStorage.getItem("Token");
      if (getToken) {
        var token = JSON.parse(getToken);
        token = token.token
        const requestURL = APIManager + "/api/GetListGameHistory";
        const requestOptions = {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        };
        fetch(requestURL, requestOptions)
          .then(response => response.json())
          .then(res => {
            console.log(res.data)
            setRows(res.data);
          })
      }
    }
    Init();
  }, []);
  const viewDetail = ()=>{
    navigate(`/app/dashboard/`, { replace: true });
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Date</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">Play with</TableCell>
            <TableCell align="center">View detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.createDated}</TableCell>
              <TableCell align="center">
                {row.result == id ? "Victory" : "Lose"}
              </TableCell>
              <TableCell align="center">
                {row.userId1 == id ? row.userId1Navigation.username : row.userId2Navigation.username}
              </TableCell>
              <TableCell align="center">
                <button style={{ cursor: 'pointer', background: 'aliceblue', width: '45px', borderRadius: "200px", border: '0px' }}
                  onClick={viewDetail}>
                  <VisibilityIcon >
                  </VisibilityIcon>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ListGameView;