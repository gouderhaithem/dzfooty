import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiKey, apiHost } from "../config";
const ElemenationCup = () => {
  const [dataFixtures, SetDataFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
       // url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        params: {
          league: `2`,
          season: `2023`,
        },
        headers: {
          "X-RapidAPI-Key": `${apiKey}`,
          "X-RapidAPI-Host": `${apiHost}`,
        },
      };

      try {
        const response = await axios.request(options);
        const data = response.data.response;

        const fixturesData = data.slice(-13).map((match) => {
          const date = match.fixture.date;
          const teamHome = match.teams.home;
          const teamAway = match.teams.away;
          const round = match.league.round;
          const goals = match.goals;

          return {
            date,
            teamHome,
            teamAway,
            round,
            goals,
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
  }, []);

  return (
    <div className="container">
      <div className="knockout-container">
        <div className="qfinal">
          <h2>quarter final</h2>
          {dataFixtures.slice(0, 7).map((fixture, index) => {
            if (index % 2 === 0) {
              return (
                <div className="knockout-box" key={index}>
                  <div className="knockout-team-one">
                    <div className="teamPhoto knock">
                      <img src={fixture.teamHome.logo} alt="" />
                      <h3 style={{ color: "white" }}>
                        {fixture.teamHome.name}
                      </h3>
                    </div>
                  </div>
                  <div className="knockout-team-two">
                    <div className="teamPhoto knock ">
                      <img src={fixture.teamAway.logo} alt="" />
                      <h3 style={{ color: "white" }}>
                        {fixture.teamAway.name}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="semifinal">
          <h2>Semi Final</h2>
          {dataFixtures.slice(9, 11).map((fixture, index) => {
            return (
              <div className="knockout-box" key={index}>
                <div className="knockout-team-one">
                  <div className="teamPhoto knock">
                    <img src={fixture.teamHome.logo} alt="" />
                    <h3 style={{ color: "white" }}>{fixture.teamHome.name}</h3>
                  </div>
                </div>
                <div className="knockout-team-two">
                  <div className="teamPhoto knock">
                    <img src={fixture.teamAway.logo} alt="" />
                    <h3 style={{ color: "white" }}>{fixture.teamAway.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="final">
          <h2> Final </h2>
          {dataFixtures.slice(-1).map((fixture, index) => {
            const formattedDate = new Date(fixture.date).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            );

            return (
              <div className="knockout-box" key={index}>
                <div className="knockout-date">{formattedDate}</div>
                <div className="knockout-team-one">
                  <div className="teamPhoto knock">
                    <img src={fixture.teamHome.logo} alt="" />
                    <h3 style={{ color: "white" }}>{fixture.teamHome.name}</h3>
                    <p style={{ paddingLeft: "2rem" }}>{fixture.goals.home}</p>
                  </div>
                </div>
                <div className="knockout-team-two">
                  <div className="teamPhoto knock">
                    <img src={fixture.teamAway.logo} alt="" />
                    <h3 style={{ color: "white" }}>{fixture.teamAway.name}</h3>
                    <p style={{ paddingLeft: "2rem" }}>{fixture.goals.away}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ElemenationCup;
