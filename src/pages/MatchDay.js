import React, { useState } from "react";

import Box from "@mui/material/Box";

import Matches from "../components//Matches";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { motion } from "framer-motion";
import { PageAnimation } from "../Animation";

const MatchDay = () => {
  const [value, setValue] = React.useState(0);
  const [season, setseason] = useState("2023");
  const [id, setId] = useState("39");
  const currentDate = new Date();

  // Format the current date as "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().split("T")[0];

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (event) => {
    setId(event.target.value);
    console.log(id);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <motion.div
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ minHeight: "100vh", paddingBottom: "2rem" }}
    >
      <div className="container">
        <br />

        <ThemeProvider theme={darkTheme}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ textAlign: "center" }}
              >
                Sesaon
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id}
                label="Ligeus"
                sx={{ backgroundColor: "black", textAlign: "center" }}
                onChange={handleChange}
              >
                <MenuItem value={39}>Premier ligue</MenuItem>
                <MenuItem value={140}> La Liga</MenuItem>
                <MenuItem value={78}>Bundesliga</MenuItem>
                <MenuItem value={61}>Ligue 1</MenuItem>
                <MenuItem value={135}>Seria A</MenuItem>
                <MenuItem value={307}>Saudi Pro League</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ThemeProvider>
      </div>

      <Matches
        season={2023}
        setseason={setseason}
        date={formattedDate}
        id={id}
      />
    </motion.div>
  );
};

export default MatchDay;
