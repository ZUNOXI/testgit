import React from "react";
import { Grid, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import questionicon from "../images/questionicon.png";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";
// import { withStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`
  };
}

// const url = "http://localhost:9090/api/boardreg";

const CreateQuestion = ({ history }) => {
  const words = ["stock", "estate", "fund", "coin", "other"];
  const [values, setValues] = React.useState({
    id: "ssafy",
    title: "",
    content: "",
    ctg: 0
  });

  const [tabs, setTabs] = React.useState(0);
  const [cateinfo, setCateinfo] = React.useState("stock");

  const handleChangetab = (event, newValue) => {
    setCateinfo(words[newValue]);
    setTabs(newValue);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const saveQuestion = e => {
    e.preventDefault();
    const url = "http://localhost:9090/api/boardreg";
    const datas = {
      uid: values.id,
      btitle: values.title,
      bcontent: values.content,
      bctg: cateinfo
    };
    axios
      .post(url, datas)
      .then(res => {
        history.push("/question");
        console.log(res);
      })
      .catch(e => console.log(e));
  };

  return (
    <form onSubmit={saveQuestion} method="post">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ width: "100%", marginTop: "30px" }}
        >
          <img src={questionicon} alt="" style={{ height: "55px" }} />
          <h1>질문</h1>
          <TextField
            id="title"
            name="btitle"
            label="제목"
            variant="outlined"
            style={{ width: "80%" }}
            onChange={handleChange("title")}
          />
        </Grid>
        <Grid>
          <AppBar position="static">
            <Tabs value={tabs} onChange={handleChangetab} name="category">
              <Tab label="주식" {...a11yProps(0)} name="stock" />
              <Tab label="부동산" {...a11yProps(1)} name="estate" />
              <Tab label="펀드" {...a11yProps(2)} name="fund" />
              <Tab label="코인" {...a11yProps(3)} name="coin" />
              <Tab label="기타" {...a11yProps(4)} name="other" />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid style={{ width: "100%", marginTop: "10px" }}>
          <TextField
            id="content"
            name="bcontent"
            label="내용"
            variant="outlined"
            onChange={handleChange("content")}
            multiline
            rows="20"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" type="submit">
            제출
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateQuestion;
