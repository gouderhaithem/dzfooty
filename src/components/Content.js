import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "./styledComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { apiKey, apiHost } from "../config";
import "../index.css";

import axios from "axios";

export const Content = ({ season, setseason, id }) => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/standings",

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
        const standings = response.data.response[0].league.standings[0];
        console.log(standings);
        console.log(apiHost);
        setTeamData(standings); // Update the teamData state with the fetched data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchData();
  }, [season, id]); // Add 'season' as a dependency

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const renderTeamData = () => {
    if (teamData.length > 0) {
      return teamData.map((team, index) => (
        <StyledTableRow key={team.team.name}>
          <StyledTableCell component="th" scope="row" size="med">
            <div className="teamPhoto">
              <p>{index + 1}</p>
              <img src={team.team.logo} alt="" />
              <h3 style={{ color: "white" }}>{team.team.name}</h3>
            </div>
          </StyledTableCell>
          <StyledTableCell align="right">{team.points}</StyledTableCell>
          <StyledTableCell align="right">{team.all.played}</StyledTableCell>
          <StyledTableCell align="right">{team.all.win}</StyledTableCell>
          <StyledTableCell align="right">{team.all.lose}</StyledTableCell>
          <StyledTableCell align="right">{team.all.draw}</StyledTableCell>
          <StyledTableCell align="right">
            {team.all.goals.for} : {team.all.goals.against}
          </StyledTableCell>
          <StyledTableCell align="right">{team.goalsDiff}</StyledTableCell>
        </StyledTableRow>
      ));
    } else {
      return (
        <StyledTableCell colSpan={3}>
          There is no data for the moment
        </StyledTableCell>
      );
    }
  };

  return (
    <div className="container">
      <ThemeProvider theme={darkTheme}>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Team</StyledTableCell>
                  <StyledTableCell align="right">Points</StyledTableCell>
                  <StyledTableCell align="right">Play</StyledTableCell>
                  <StyledTableCell align="right">Win</StyledTableCell>
                  <StyledTableCell align="right">Lose</StyledTableCell>
                  <StyledTableCell align="right">Draw</StyledTableCell>
                  <StyledTableCell align="right">+ / -</StyledTableCell>
                  <StyledTableCell align="right">GD</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderTeamData()}</TableBody>
            </Table>
          </TableContainer>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Content;
