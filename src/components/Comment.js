import React from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

const Comment = ({ data }) => {
  const showqmentel = exist => {
    if (exist) {
      return (
        <div>
          {exist.map(one => (
            <div key={one.id}>
              <b>
                <p style={{ fontSize: "15px" }}>{one.writer}</p>
              </b>
              <p style={{ fontSize: "10px" }}>{one.content}</p>
              <p style={{ fontSize: "10px" }}>{one.date}</p>
              <hr style={{ border: "0.5px solid #c8d0d0" }} />
            </div>
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const [content, setContent] = React.useState("");

  const handleChange = e => {
    setContent(e.target.value);
  };

  const saveComment = e => {
    e.preventDefault();
    axios
      .post("http://localhost:9090/api/reply/replyreg")
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={saveComment}>
        <TextField
          multiline
          rows="1"
          variant="outlined"
          value={content}
          onChange={handleChange}
          style={{
            backgroundColor: "#fafafa",
            width: "100%",
            marginBottom: "10px"
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" type="submit">
            등록
          </Button>
        </div>
        <div>{showqmentel(data)}</div>
      </form>
    </div>
  );
};

export default Comment;
