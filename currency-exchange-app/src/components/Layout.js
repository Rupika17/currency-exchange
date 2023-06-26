import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./Layout.css";
import { AppBar, Tab, Tabs } from "@mui/material";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import PropTypes from "prop-types";
import CurrencyConverter from "./CurrencyConverter";
import ConversionHistory from "./ConversionHistory";

const defaultTheme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Layout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" color="">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Typography
              variant="h6"
              className="DefaultText"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <FindReplaceIcon color="primary" /> Currency<b>Exchange</b>
            </Typography>

            <Tabs value={value} onChange={handleChange} centered >
              <Tab className={value === 0 ? "TabelHeaderText" : "DefaultText"} label="Currency Convertor" {...a11yProps(0)} />
              <Tab className={value === 1 ? "TabelHeaderText" : "DefaultText"} label="View Conversion History" {...a11yProps(1)} />
            </Tabs>

            <Typography
              variant="subtitle2"
              className="colorPrimary"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Logout
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Grid  spacing={0} className="removePadding">
              <Grid item xs={12}>
                  <TabPanel value={value} index={0}>
                   <CurrencyConverter />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ConversionHistory />
                  </TabPanel>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
