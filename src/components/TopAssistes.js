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
import { apiKey, apiHost } from "../config";
const TopAssistes = ({ season, setseason, id }) => {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/players/topassists",
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
          const assisteTotal = item.statistics[0]?.goals.assists;

          return {
            playerName,
            playerPhoto,
            club,
            clubPhoto,
            assisteTotal,
          };
        });

        setPlayersData(playerNamesAndGoals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [season, id]);
  const mystyle = {
    height: "100px",
    width: "100px",
    marginLeft: "0",
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Player</StyledTableCell>
              <StyledTableCell align="lef">Club</StyledTableCell>
              <StyledTableCell align="left">Assistes</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playersData.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={3}>
                  There is no data for the moment
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              playersData.map((player) => (
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
                  <StyledTableCell align="left">
                    {player.assisteTotal}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TopAssistes;
