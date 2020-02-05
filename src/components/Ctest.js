import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import estate_carousel from "../images/estate_carousel.png";

import {
  //   FormLabel,
  //   FormControlLabel,
  //   Checkbox,
  //   Radio,
  //   RadioGroup,
  Paper,
  Button,
  Grid
} from "@material-ui/core";

import "../style/SecondExample.scss";

function Project(props) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: props.item.color
      }}
      elevation={10}
    >
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

const items = [
  {
    name: "Lear Music Reader",
    description: "A PDF Reader specially designed for musicians.",
    color: "#64ACC8",
    background: estate_carousel
  },
  {
    name: "Hash Code 2019",
    description:
      "My Solution on the 2019 Hash Code by Google Slideshow problem.",
    color: "#7D85B1"
  },
  {
    name: "Terrio",
    description: "A exciting mobile game game made in the Unity Engine.",
    color: "#CE7E78"
  },
  {
    name: "React Carousel",
    description: "A Generic carousel UI component for React using material ui.",
    color: "#C9A27E"
  }
];

export default class MyProjectsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 10,
      animation: "fade",
      indicators: true
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <Carousel
          className="SecondExample"
          autoPlay={this.state.autoPlay}
          timer={this.state.timer}
          animation={this.state.animation}
          indicators={this.state.indicators}
        >
          {items.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>
      </Grid>
    );
  }
}
