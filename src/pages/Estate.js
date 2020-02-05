import React from "react";
import { Grid } from "@material-ui/core";

const Estate = () => {
  const kakao = window.kakao;
  window.onload=function(){
    var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

    var map = new kakao.maps.Map(container, options);
    var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

var position = new kakao.maps.LatLng(33.450701, 126.570667);

// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
roadviewClient.getNearestPanoId(position, 50, function(panoId) {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
});
  }
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Grid
        item
        style={{ backgroundColor: "orange", width: "100%", height: "30rem" }}
      >
        <div id="map" style={{
          backgroundColor: "white",
          width: "100%",
          height: "50rem"
        }}></div>
      </Grid>
      <Grid
        item
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "50rem"
        }}
      >
        <div id="roadview" style={{
          backgroundColor: "white",
          width: "100%",
          height: "50rem"
        }}></div>
      </Grid>
    </Grid>
  );
};

export default Estate;
