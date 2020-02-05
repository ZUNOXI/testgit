import React from "react";
import { Button, TextField } from "@material-ui/core";

const Answer = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
        multiline
        rows="6"
        variant="outlined"
        style={{
          backgroundColor: "#fafafa",
          width: "100%",
          marginBottom: "10px"
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary">
          등록
        </Button>
      </div>
    </div>
  );
};

export default Answer;
