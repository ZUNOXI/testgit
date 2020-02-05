import React from "react";
import { Grid } from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import News from "../components/News";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Substock from "../components/Substock";
import Ctest from "../components/Ctest";
import CardPart from "../components/CardPart";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      backgroundColor="black"
    >
      <Grid
        style={{
          backgroundColor: "white",
          width: "100%"
          // marginTop: "4rem"
        }}
      >
        <Ctest />
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{
          backgroundColor: "  ",
          width: "100%"
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "5px" }}
        >
          <Grid item xs={4} style={{ backgroundColor: "blue" }}>
            <CardPart />
          </Grid>
          <Grid item xs={4} style={{ backgroundColor: "lightblue" }}>
            <CardPart />
          </Grid>
          <Grid item xs={4} style={{ backgroundColor: "blue" }}>
            <CardPart />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabel
            className={classes.root}
          >
            <Link to="/home">
              <BottomNavigationAction label="News" icon={<RestoreIcon />} />
            </Link>
            <Link to="/home/substock">
              <BottomNavigationAction label="Stock" icon={<FavoriteIcon />} />
            </Link>
            <Link to="/home/subcoin">
              <BottomNavigationAction label="Coin" icon={<LocationOnIcon />} />
            </Link>
          </BottomNavigation>
        </Grid>
        <Grid item xs={12}>
          <Route path="/home" exact component={News} />
          <Route path="/home/substock" component={Substock} />
        </Grid>
      </Grid>
      <Grid
        style={{
          backgroundColor: "lightgray",
          height: "30rem",
          width: "100%"
        }}
      >
        ㅇㅇㅇㅇ
      </Grid>
      <Grid
        style={{ width: "100%", height: "10rem", backgroundColor: "#555555" }}
      >
        place
      </Grid>
    </Grid>
  );
};

export default Home;
