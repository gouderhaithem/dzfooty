import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTableRow } from "./styledComponent";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopAssistes from "./TopAssistes";
import CircularProgress from "@mui/material/CircularProgress";
import { apiKey, apiHost } from "../config";
const TopSoccer = ({ season, setseason, id }) => {
  const [playersData, setPlayersData] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/players/topscorers",
        params: {
          season: `${season}`,
          league: `${id}`,
        },
        headers: {
          "X-RapidAPI-Key": `${apiKey}`,
          "X-RapidAPI-Host": `${apiHost}`,
        },
      };

      try {
        const response = await axios.request(options);
        const data = response.data.response;
        console.log(data);

        const playerNamesAndGoals = data.map((item) => {
          const playerName = item.player.name;
          const playerPhoto = item.player.photo;
          const club = item.statistics[0].team.name;
          const clubPhoto = item.statistics[0].team.logo;
          const goalTotal = item.statistics[0]?.goals.total;

          return {
            playerName,
            playerPhoto,
            club,
            clubPhoto,
            goalTotal,
          };
        });

        setPlayersData(playerNamesAndGoals);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchData();
  }, [season, id]);
  const mystyle = {
    height: "100px",
    width: "100px",
    marginLeft: "0",
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="container">
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            background: "black",
            color: "white",
          }}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label="Top Soccer "
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: "Roboto Condensed",
              }}
            />
            <Tab
              label="Top Assistes"
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: "Roboto Condensed",
              }}
            />
          </Tabs>
        </Box>
      </ThemeProvider>

      {value === 0 && (
        <TableContainer component={Paper}>
          {loading ? (
            // Show CircularProgress when loading is true
            <center>
              <br />
              <br />
              <br />
              <br />

              <CircularProgress size={100} />
            </center>
          ) : (
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Player</StyledTableCell>
                  <StyledTableCell align="lef">Club</StyledTableCell>
                  <StyledTableCell align="left">Goals</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {playersData.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={3}>There is no data</StyledTableCell>
              </StyledTableRow>
            ) : (<>
                {playersData.map((player) => (
                  <StyledTableRow key={player.playerName}>
                    <StyledTableCell component="th" scope="row">
                      <div className="teamPhoto">
                        {" "}
                        <img
                          src={player.playerPhoto}
                          style={mystyle}
                          alt=""
                        />{" "}
                        <h3>{player.playerName}</h3>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="teamPhoto">
                        {" "}
                        <img
                          src={player.clubPhoto}
                          style={{ marginLeft: "0" }}
                          alt=""
                        />{" "}
                        <h3>{player.club}</h3>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        fontSize: 100,
                      }}
                      align="left"
                    >
                      {player.goalTotal}
                    </StyledTableCell>
                  </StyledTableRow>
                ))} </>)}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
      {value === 1 && (
        <TopAssistes season={season} setseason={setseason} id={id} />
      )}
    </div>
  );
};

export default TopSoccer;
