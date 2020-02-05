import React, { useState, useEffect } from "react";
import { Grid, Button, Icon } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import MessageIcon from "@material-ui/icons/Message";
import styled from "styled-components";
import CreateAnswer from "../components/CreateAnswer";
import Answer from "../components/Answer";
import Comment from "../components/Comment";
import axios from "axios";
import BoardComment from "../components/BoardComment";
// import qa from "../images/Q&A.png";
// import questionicon from "../images/questionicon.png";
// import axios from "axios";
const StyledIcon = styled(Icon)`
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const DetailQuestion = ({ match, history }) => {
  // eslint-disable-next-line no-unused-expressions
  const [qbool, setQbool] = useState(false);
  const [abool, setAbool] = useState(false);

  const [datas, setDatas] = useState([]);
  const [commentdata, setCommentdata] = useState([]);
  const [replydata, setReplydata] = useState([]);
  const [answerdata, setAnswerdata] = useState([]);
  const [isityou, setIsityou] = React.useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/boarddetail/${match.params.id}`)
      .then(res => {
        console.log(res.data.resdata);
        console.log();
        console.log(`http://localhost:9090/api/boarddetail/${match.params.id}`);
        setDatas(res.data.resdata);
        if (true) {
          // 현재 사용자가 글 작성자와 일치하는지 확인
          setIsityou(true);
        }
      })
      .catch(e => {
        console.log(e);
      });
    axios
      .get("http://localhost:9090/api/comment/comment")
      .then(res => {
        setReplydata(res.data.resdata);
      })
      .catch(e => {
        console.log(e);
      });
    axios
      .get("http://localhost:9090/api/reply/reply")
      .then(res => {
        setCommentdata(res.data.resdata);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const qcomment = () => {
    if (qbool) {
      setQbool(false);
    } else {
      setQbool(true);
    }
  };

  const showanswer = () => {
    if (abool) {
      setAbool(false);
    } else {
      setAbool(true);
    }
  };

  const deletequestion = e => {
    e.preventDefault();
    const url = "http://localhost:9090/api/boarddelete";
    const datas = match.params.id;
    axios
      .post(url, datas)
      .then(res => {
        history.push("/question");
        console.log(res);
      })
      .catch(e => console.log(e));
  };
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{ marginTop: "10px" }}
    >
      <Grid>
        <a href="./" style={{ textDecoration: "none", color: "black" }}>
          <h1>JAVER Q&A</h1>
        </a>
      </Grid>
      <Grid
        style={{
          border: "1px solid #c8d0d0",
          borderRadius: "5px",
          width: "100%"
        }}
      >
        <div style={{ marginLeft: "10%", marginRight: "5%" }}>
          {datas !== {} ? <h1>{datas.btitle}</h1> : <h1>Not connected</h1>}
          <hr style={{ border: "0.5px solid #c8d0d0" }} />
          <br />
          {datas !== {} ? <p>{datas.bcontent}</p> : <p>Empty</p>}
          <br />
          <hr style={{ border: "0.5px solid #c8d0d0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              marginTop: "2%",
              marginBottom: "2%"
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                component={ErrorIcon}
                style={{ height: "15px", marginTop: "10px" }}
              />
              <p style={{ fontSize: "10px" }}>여러분의 지식을 나눠주세요!</p>
            </div>
            <div
              style={{
                display: "flex",
                textAlgin: "center",
                alignItems: "center"
              }}
            >
              <StyledIcon onClick={qcomment} component={MessageIcon} />

              {isityou ? (
                <div>
                  <Button
                    variant="contanined"
                    href="/"
                    style={{ backgroundColor: "yellow" }}
                  >
                    수정
                  </Button>
                  <form onSubmit={deletequestion}>
                    <Button
                      variant="contained"
                      // onClick={deletequestion}
                      style={{ backgroundColor: "red" }}
                      type="submit"
                    >
                      삭제
                    </Button>
                  </form>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={showanswer}
                >
                  답변하기
                </Button>
              )}
            </div>
          </div>
          {qbool ? (
            <BoardComment data={commentdata[match.params.id - 1]} />
          ) : (
            <></>
          )}
          {abool ? <CreateAnswer /> : <></>}
        </div>
      </Grid>
      <Grid container justify="flex-end" style={{ marginTop: "2%" }}>
        <Button variant="contained" href="./" style={{ marginRight: "2%" }}>
          목록
        </Button>
      </Grid>
      <p style={{ fontSize: "12px", marginTop: "0px" }}>
        {/* 답변 총 {values.answerdata[match.params.id - 1].length}개 */}
      </p>
      {/* <Grid style={{ width: "100%" }}>
        {values.answerdata[match.params.id - 1].map(data => (
          <Answer
            key={data.id}
            data={data}
            replydata={values.replydata[match.params.id - 1]}
            idx={data.id}
          />
        ))}
      </Grid> */}
    </Grid>
  );
};

export default DetailQuestion;
