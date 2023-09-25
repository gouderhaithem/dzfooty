import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { apiKey, apiHost } from "../config";
import { StyledTableCell, StyledTableRow } from "./styledComponent";

const Matches = ({ season, setseason, id, date }) => {
  const [dataFixtures, SetDataFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        params: {
          date: `${date}`,
          league: `${id}`,
          season: `${season}`,
        },
        headers: {
          "X-RapidAPI-Key": `${apiKey}`,
          "X-RapidAPI-Host": `${apiHost}`,
        },
      };

      // Check if the value of ${date} is empty
      if (`${date}` === "") {
        delete options.params.date;
      }

      try {
        const response = await axios.request(options);
        const data = response.data.response;
        console.log(data);
        const fixturesData = data.map((match) => {
          const date = match.fixture.date;
          const teamHome = match.teams.home;
          const teamAway = match.teams.away;
          const round = match.league.round;
          const goals = match.goals;
          const time = match.fixture.status.elapsed;
          const status = match.fixture.status.long;

          return {
            date,
            teamHome,
            teamAway,
            round,
            goals,
            time,
            status,
          };
        });
        console.log(fixturesData);
        SetDataFixtures(fixturesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };
    fetchData();
  }, [season, id, date]);

  const filteredFixtures =
    season === "2023" ? dataFixtures : dataFixtures.slice().reverse();
  console.log(filteredFixtures);

  return (
    <div className="container">
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
        <>
          {dataFixtures.length === 0 ? (
            <center style={{ backgroundColor: "aliceblue" }}>
              <StyledTableRow>
                <StyledTableCell colSpan={3}>
                  <h2>There is no Match today</h2>
                </StyledTableCell>
              </StyledTableRow>
            </center>
          ) : (
            <div>
              {filteredFixtures.map((sigleMacthData, index) => {
                const options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const formattedDate = new Date(
                  sigleMacthData.date
                ).toLocaleString(undefined, options);

                const roundNumber = sigleMacthData.round.includes("-")
                  ? sigleMacthData.round.split("-")[1].trim()
                  : sigleMacthData.round.trim();

                return (
                  <li className="match-list" key={index}>
                    <div className="match-list-header">
                      <center>
                        <h6 style={{ color: "white" }}> {formattedDate} </h6>
                      </center>
                      <div className="round"> round {roundNumber}</div>
                      <li className="singlematch">
                        <div className="team hometeam">
                          <img src={sigleMacthData.teamHome.logo} alt="" />
                          <p>{sigleMacthData.teamHome.name}</p>
                        </div>
                        <div className="result">
                          <div
                            className="time"
                            style={{ paddingTop: "1.5rem", width: "130%" }}
                          >
                            {sigleMacthData.goals.home !== null ? (
                              <>
                                <center>
                                  <p>
                                    {sigleMacthData.goals.home} :{" "}
                                    {sigleMacthData.goals.away}
                                  </p>
                                  {sigleMacthData.status ===
                                    "Match Finished" && (
                                    <p
                                      style={{
                                        paddingTop: "1rem",
                                      }}
                                    >
                                      finished
                                    </p>
                                  )}
                                </center>
                              </>
                            ) : (
                              <>
                                {new Date(
                                  sigleMacthData.date
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="team awayteam">
                          <img src={sigleMacthData.teamAway.logo} alt="" />
                          <p>{sigleMacthData.teamAway.name}</p>
                        </div>
                      </li>
                    </div>
                  </li>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Matches;
