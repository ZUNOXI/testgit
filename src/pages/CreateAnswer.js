import React from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const CreateAnswer = ({ match }) => {
  const [values, setValues] = React.useState({
    num: "",
    content: ""
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const saveAnswer = e => {
    e.preventDefault();
    const url = "http://localhost:9090/api/commentreg";
    console.log(match);
    console.log(values);
    axios
      .post(url, {
        bnum: match.params.id,
        uid: "ssafy",
        ccontent: values.content
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={saveAnswer}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleChange("content")}
        />
      </Grid>
    </form>
  );
};

export default CreateAnswer;
