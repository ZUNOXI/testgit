import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { coinName } from "./CoinName.js";
import crypto from "../images/crypto.jpg";
// import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
/* 3자리 단위로 콤마 */
function addComma(number) {
  var number_parts = number.split(".");
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  if (number_parts.length > 1) {
    return number_parts[0].replace(regexp, ",") + "." + number_parts[1];
  } else {
    return number.replace(regexp, ",");
  }
}

/* api로 데이터 가져와서 정리하기 */
const Coindata = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .post("https://api.bithumb.com/public/ticker/ALL")
      .then(res => {
        console.log(res.data.data);
        const all_rows = [];
        for (let [key, value] of Object.entries(res.data.data)) {
          if (key !== "date") {
            all_rows.push({
              name: key,
              opening_price: `${addComma(value.opening_price)}원`,
              acc_trade_value: `${addComma(value.acc_trade_value)}원`,
              fluctate_24H: `${addComma(value.fluctate_24H)}원`,
              fluctate_rate_24H: `${value.fluctate_rate_24H}%`
            });
          }
        }
        setRows(all_rows);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div>
      <CoinHeader />
      <DenseTable rows={rows} />
    </div>
  );
};

/*header 달기 */
const CoinHeader = () => (
  <header
    style={{
      borderRadius: "5px",
      marginTop: "30px"
      // background: "white"
    }}
  >
    <img
      src={crypto}
      alt=""
      style={{
        height: "auto",
        width: "100%",
        opacity: "1",
        // filter: "blur(1px)",
        borderRadius: "5px"
      }}
    />
  </header>
);
/* 비트코인 table */
const DenseTable = ({ rows }) => {
  const classes = useStyles();

  /* 등락 색깔 바꾸기 */
  const table = row => {
    if (row.fluctate_24H[0] === "-") {
      return (
        <>
          <TableCell align="right" style={{ color: "blue" }}>
            ▼ {row.fluctate_24H}
          </TableCell>
          <TableCell align="right" style={{ color: "blue" }}>
            ▼ {row.fluctate_rate_24H}
          </TableCell>
        </>
      );
    } else {
      return (
        <>
          <TableCell align="right" style={{ color: "red" }}>
            ▲ {row.fluctate_24H}
          </TableCell>
          <TableCell align="right" style={{ color: "red" }}>
            ▲ {row.fluctate_rate_24H}
          </TableCell>
        </>
      );
    }
  };

  return (
    <div>
      <span>오늘의 비트코인</span>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>순위</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">시가</TableCell>
              <TableCell align="right">변동가</TableCell>
              <TableCell align="right">변동률</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="data">
                  {idx + 1}
                </TableCell>
                <TableCell align="right">
                  {row.name} <p>{coinName["bithumb"][row.name]}</p>
                </TableCell>
                <TableCell align="right">{row.opening_price}</TableCell>
                {table(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Coindata;
