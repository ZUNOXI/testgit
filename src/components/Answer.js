import React, { useState } from "react";
import MessageIcon from "@material-ui/icons/Message";
import styled from "styled-components";
import { Icon } from "@material-ui/core";
import Comment from "./Comment";

const StyledIcon = styled(Icon)`
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Answer = ({ data, replydata, idx }) => {
  const [acbool, setAcbool] = useState(false);
  const acomment = () => {
    if (acbool) {
      setAcbool(false);
    } else {
      setAcbool(true);
    }
  };
  const show = one => {
    if (one) {
      return <Comment data={replydata[idx - 1]} />;
    } else {
      return <div></div>;
    }
  };
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #c8d0d0",
        borderRadius: "5px",
        marginBottom: "20px"
      }}
    >
      <div style={{ marginLeft: "10%", marginRight: "5%" }}>
        <p>{data.writer}</p>
        <hr style={{ border: "0.5px solid #c8d0d0" }} />
        <p>{data.content}</p>
        <br />
        <hr style={{ border: "0.5px solid #c8d0d0" }} />
        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "7px"
          }}
        >
          <p style={{ fontSize: "12px" }}>{data.date}</p>
          <StyledIcon onClick={acomment} component={MessageIcon} />
        </footer>
        <div>{show(acbool)}</div>
      </div>
    </div>
  );
};

export default Answer;
