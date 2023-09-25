import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Content from "./Content";
import TopSoccer from "./TopSoccer";
import Matches from "./Matches";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Cups from "./Cups";
import { motion } from "framer-motion";
import { PageAnimation } from "../Animation";

const SwitchCups = () => {
  const [value, setValue] = React.useState(0);
  const [season, setseason] = useState("2023");
  const { id } = useParams();

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (event) => {
    setseason(event.target.value);
    console.log(season);
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
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            background: "black",
            color: "white",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange2}
            centered
            TabIndicatorProps={{
              style: { backgroundColor: "white" },
            }}
          >
            <Tab
              label="Table "
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: "Roboto Condensed",
              }}
            />
            <Tab
              label="Matches"
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: "Roboto Condensed",
              }}
            />
            <Tab
              label="Top Soccer"
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: "Roboto Condensed",
              }}
            />
          </Tabs>
        </Box>
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
                value={season}
                label="season"
                sx={{ backgroundColor: "black", textAlign: "center" }}
                onChange={handleChange}
              >
                <MenuItem value={2023}>2023/2024</MenuItem>
                <MenuItem value={2022}>2022/2023</MenuItem>
                <MenuItem value={2021}>2021/2022</MenuItem>
                <MenuItem value={2020}>2020/2021</MenuItem>
                <MenuItem value={2019}>2019/2020</MenuItem>
                <MenuItem value={2018}>2018/2019</MenuItem>
                <MenuItem value={2017}>2017/2018</MenuItem>
                <MenuItem value={2016}>2016/2017</MenuItem>
                <MenuItem value={2015}>2015/2016</MenuItem>
                <MenuItem value={2014}>2014/2015</MenuItem>
                <MenuItem value={2013}>2013/2014</MenuItem>
                <MenuItem value={2012}>2012/2013</MenuItem>
                <MenuItem value={2011}>2011/2012</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ThemeProvider>
      </div>
      {value === 0 && <Cups season={season} setseason={setseason} id={id} />}
      {value === 1 && (
        <Matches season={season} setseason={setseason} id={id} date={""} />
      )}
      {value === 2 && (
        <TopSoccer season={season} setseason={setseason} id={id} />
      )}
    </motion.div>
  );
};

export default SwitchCups;
