import React, { useState } from "react";
import axios from "axios";

// const datas = [
//   {
//     id: 1,
//     title: "제에모옥",
//     content: "느아"
//   },
//   {
//     id: 2,
//     title: "제목",
//     content: "내용"
//   }
// ];
// const datas = ["hi", "hello"];

const News = () => {
  const URL = "http://127.0.0.1/user";
  const [datas, setDatas] = useState([]);
  axios
    .post(URL)
    .then(res => {
      console.log(res);
      setDatas(res.data.news);
    })
    .catch(e => {
      console.log(e);
    });
  return datas.map(data => (
    <div key={data}>
      <a href={data.urltitle}>
        <img src={data.imgurl} alt="" />
        <h4>{data.title}</h4>
      </a>
    </div>
  ));
};

export default News;
