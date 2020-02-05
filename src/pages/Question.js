import React, { useEffect } from "react";
import Board from "../components/Board";
import { Grid, Button } from "@material-ui/core";
import qa from "../images/Q&A2.png";
import axios from "axios";

const Question = () => {
  const [datas, setDatas] = React.useState([]);

  useEffect(() => {
    const url = "http://localhost:9090/api/board";
    axios
      .get(url)
      .then(res => {
        console.log(res);
        console.log(res.data.resdata);
        setDatas(res.data.resdata);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Grid container style={{ marginTop: "10px" }}>
      <h1>묻고 답하기</h1>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{
          border: "1px solid #c8d0d0",
          borderRadius: "5px",
          marginTop: "5px",
          height: "5rem"
        }}
      >
        <Grid item xs={7} container direction="row" alignItems="center">
          <img src={qa} alt="" height="70px" />
          <h2>궁금한 것을 질문해 보세요!</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" href="/createquestion">
            질문하기
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "10px", marginBottom: "5px" }}>
        <hr />
      </Grid>
      <Grid item xs={9}>
        {datas.map(data => (
          <Board key={data.id} one={data} />
        ))}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Question;
