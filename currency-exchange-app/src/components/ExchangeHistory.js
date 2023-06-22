import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExchangeRate,
  setIntervalValue,
  setLowestCurrency,
  setHighestCurrency,
  setAverageCurrency,
} from "../actions/actions";
import intervalOptions from "../intervalOptions";
import axios from "axios";
import SparklineChart from "./SparklineChart";

function ExchangeHistory() {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = React.useState("table");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const { fromCurrency, toCurrency, exchangeRate, highest, lowest, average } =
    useSelector((state) => state);
  const interval = useSelector((state) => state.interval);

  const handleIntervalChange = (event, newValue) => {
    dispatch(setIntervalValue(newValue.label));
  };

  function formatDate(receivedDate) {
    const year = receivedDate.getFullYear();
    const month = String(receivedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(receivedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  function formatDateBack(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        let calculateDate;
        if (interval === 7) {
          calculateDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (interval === 14) {
          calculateDate = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
        } else if (interval === 30) {
          calculateDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        const startDate = formatDate(today);
        const endDate = formatDate(calculateDate);

        const response = await axios.get(
          `https://api.exchangerate.host/timeseries?start_date=${endDate}&end_date=${startDate}&base=${fromCurrency}&symbols=${toCurrency}`
        );
        const result = response?.data?.rates;
        const formattedData = Object.entries(result)
          .map(([date, rates]) => ({
            date: formatDateBack(date),
            rate: Object.values(rates)[0],
          }))
          .reverse();
        dispatch(setExchangeRate(formattedData));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchData();
    let lowestRate = Infinity;
    let highestRate = -Infinity;
    let sum = 0;

    exchangeRate.forEach((rate) => {
      const { rate: currentRate } = rate;

      if (currentRate < lowestRate) {
        lowestRate = currentRate;
        dispatch(setLowestCurrency(lowestRate));
      }

      if (currentRate > highestRate) {
        highestRate = currentRate;
        dispatch(setHighestCurrency(highestRate));
      }

      sum += currentRate;
    });

    let averageRate = sum / exchangeRate.length;
    dispatch(setAverageCurrency(averageRate));
  }, [interval,dispatch,toCurrency,fromCurrency]);

  return (
    <>
      <Grid container spacing={2} className="paddingTop">
        <Grid container xs={12} className="paddingTop">
          <Typography variant="h6">Exchange History</Typography>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disableClearable
            options={intervalOptions}
            getOptionLabel={(option) => option.label.toString()}
            value={intervalOptions.find((option) => option.label === interval)}
            onChange={handleIntervalChange}
            style={{ width: 60, margin: 0 }}
            renderInput={(params) => (
              <TextField {...params} label="Duration" variant="standard" />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="table"
                control={<Radio />}
                label="Table"
              />
              <FormControlLabel
                value="chart"
                control={<Radio />}
                label="Chart"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="paddingTop"
      >
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            {radioValue && radioValue === "table" ? (
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Exchange Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exchangeRate.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row">{data.date}</TableCell>
                      <TableCell scope="row">{data.rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <>
                <Typography align="left" variant="h6" className="paddingTop">Sparkline Chart Example</Typography>
                <SparklineChart rates={exchangeRate} />
              </>
            )}
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Statistics</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">Lowest</TableCell>
                  <TableCell scope="row">{lowest}</TableCell>
                </TableRow>
                <TableRow
                  key={2}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">Highest</TableCell>
                  <TableCell scope="row">{highest}</TableCell>
                </TableRow>
                <TableRow
                  key={3}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">Average</TableCell>
                  <TableCell scope="row">{average}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default ExchangeHistory;
