import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardActionArea } from "@mui/material";

import myleague from "../data/myleague";
import mycups from "../data/MyCups";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageAnimation } from "../Animation";

/*
// 1 world cup
// 3 europa leauge
       //61 ligue 1
      //135 seria a
      //78 boundesliga 
       id:88
name:"Eredivisie"
id:94
name:"Primeira Liga porto"
id:140
name:"laliga "
id:2
name:"UEFA Champions League"
type:"Cup"
id:186
name:"Ligue 1 algeria" 
id:187
name:"Ligue 2 algeria"
id:202
name:"Ligue Professionnelle 1 tunis"
id:204
name:"TFF 1. Lig turki"
id:233
name:"Premier League egypt"
       */

const HomePage = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [leagues, SetLeagues] = useState(myleague());
  const [cups, SetCups] = useState(mycups());
  console.log(leagues);
  const LeaguesDiv = () => {
    return (
      <motion.div
        className="card-container"
        variants={PageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {leagues.map((onecup, index) => (
          <ThemeProvider key={index} theme={darkTheme}>
            <Card sx={{ maxWidth: 230 }}>
              <CardActionArea component={Link} to={`/switch/${onecup.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={onecup.logo}
                  alt="green iguana"
                  style={{ height: "200px", objectFit: "none" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ textAlign: "center" }}
                  >
                    {onecup.name}
                  </Typography>
                  <Typography
                    variant="body3"
                    color="text.secondary"
                    style={{ textAlign: "center" }}
                  >
                    Watch the {onecup.name} standings table with player stats
                    and match times
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ThemeProvider>
        ))}
      </motion.div>
    );
  };
  const CupsDiv = () => {
    return (
      <motion.div
        className="card-container"
        variants={PageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {cups.map((onecup, index) => (
          <ThemeProvider key={index} theme={darkTheme}>
            <Card sx={{ maxWidth: 230 }}>
              <CardActionArea component={Link} to={`/switchCups/${onecup.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={onecup.logo}
                  alt="green iguana"
                  style={{ height: "200px", objectFit: "none" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ textAlign: "center" }}
                  >
                    {onecup.name}
                  </Typography>
                  <Typography
                    variant="body3"
                    color="text.secondary"
                    style={{ textAlign: "center" }}
                  >
                    Watch the {onecup.name} standings table with player stats
                    and match times
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ThemeProvider>
        ))}
      </motion.div>
    );
  };
  const [showCups, setShowCups] = useState(true); // Initially showing CupsDiv

  // Click handlers for the switch buttons
  const handleCupClick = () => {
    setShowCups(true);
  };

  const handleLeaguesClick = () => {
    setShowCups(false);
  };
  return (
    <div className="container homepage">
      <div className="switchButton">
        <div className="switchbtn" onClick={handleCupClick}>
          <center>leagues</center>
        </div>
        <div className="switchbtn" onClick={handleLeaguesClick}>
          <center>Cup</center>
        </div>
      </div>
      {/* Conditional rendering based on the state */}
      {showCups ? <LeaguesDiv /> : <CupsDiv />}
    </div>
  );
};

export default HomePage;
