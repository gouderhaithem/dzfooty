import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "./styledComponent";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { apiKey, apiHost } from "../config";

const Cups = ({ season, id }) => {
  const [teamData, setTeamData] = useState([]);
  console.log(teamData.length);

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
        const standings = response.data.response[0].league.standings;

        setTeamData(standings); // Update the teamData state with the fetched data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchData();
  }, [season, id]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="container">
      {teamData.length > 0 ? (
        teamData.map((group, index) => (
          <div className="group" key={index}>
            <div className="group-header">
              <h3>{group[0].group}</h3>
            </div>
            <div className="group-teams">
              <ThemeProvider theme={darkTheme}>
                {loading ? (
                  <center>
                    <br />
                    <br />
                    <br />
                    <br />
                    <CircularProgress size={100} />
                  </center>
                ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Team</StyledTableCell>
                          <StyledTableCell align="left">Points</StyledTableCell>
                          <StyledTableCell align="left">Played</StyledTableCell>
                          <StyledTableCell align="left">Win</StyledTableCell>
                          <StyledTableCell align="left">Lose</StyledTableCell>
                          <StyledTableCell align="left">Draw</StyledTableCell>
                          <StyledTableCell align="left">+ / -</StyledTableCell>
                          <StyledTableCell align="left">GD</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.map((team, teamIndex) => (
                          <StyledTableRow key={teamIndex}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              size="med"
                            >
                              <div className="teamPhoto">
                                <p>{teamIndex + 1}</p>
                                <img src={team.team.logo} alt="" />
                                <h3 style={{ color: "white" }}>
                                  {team.team.name}
                                </h3>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.points}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.all.played}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.all.win}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.all.lose}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.all.draw}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.all.goals.for} : {team.all.goals.against}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {team.goalsDiff}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ThemeProvider>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            backgroundColor: "aliceblue",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>There is no data for the moment</div>
        </div>
      )}
    </div>
  );
};

export default Cups;
