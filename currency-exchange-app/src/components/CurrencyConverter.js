import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAmount,
  setFromCurrency,
  setToCurrency,
  setConversionResult,
  setConversionHistory,
  setCurrency,
  setFromtoTo,
  setTotoFrom,
} from "../actions/actions";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ExchangeHistory from "./ExchangeHistory";

// const currency = [{ label: "USD" }, { label: "EUR" }];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#009688"),
  backgroundColor: "#009688",
  "&:hover": {
    backgroundColor: "#009688",
  },
}));

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { amount, fromCurrency, toCurrency, conversionResult, currency, toToFrom, fromToTo } = useSelector(
    (state) => state
  );
  const conversionHistory = useSelector((state) => state.conversionHistory);

  const handleConversion = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const result = response?.data?.result;
      dispatch(setConversionResult(result));
      saveConversionToHistory(result);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const saveConversionToHistory = (result) => {
    const conversion = {
      fromCurrency,
      toCurrency,
      amount,
      result,
      date: getCurrentDate(),
    };
    dispatch(setConversionHistory([...conversionHistory, conversion]));
  };

  // Helper function to get the current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function flip() {
    dispatch(setFromCurrency(toCurrency));
    dispatch(setToCurrency(fromCurrency));
  }

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate.host/symbols`
        );
        const result = response?.data?.symbols;
        const formattedData = Object.keys(result);
        dispatch(setCurrency(formattedData));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchCurrency();
  }, []);

    useEffect(() => {
    
    const fetchTotoFromCurrency = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate.host/convert?from=${toCurrency}&to=${fromCurrency}&amount=1`
        );
        const result = response?.data?.result;
        dispatch(setTotoFrom(result));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchTotoFromCurrency();

    const fetchFromtoToCurrency = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=1`
        );
        const result = response?.data?.result;
        dispatch(setFromtoTo(result));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchFromtoToCurrency();
   
  }, [toToFrom,fromToTo,fromCurrency,toCurrency]);

  return (
    <>
      <Grid container spacing={2}>
        <Typography variant="h4">I want to convert</Typography>
      </Grid>

      <Grid container spacing={2} className="paddingTop">
        <Grid item xs={2}>
          <TextField
            id="amount"
            label="Amount"
            variant="standard"
            type="number"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            defaultValue={fromCurrency}
            value={fromCurrency}
            options={currency}
            id="disable-clearable"
            disableClearable
            onChange={(event, value) => dispatch(setFromCurrency(value))}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="standard" />
            )}
            onBlur={() => {
              if (!currency.includes(fromCurrency)) {
                dispatch(setFromCurrency(""));
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{
              borderRadius: 1,
              height: "100%",
              backgroundColor: "white",
              color: "#009688",
              "&:hover": { backgroundColor: "white", color: "#009688" },
            }}
            onClick={() => {
              flip();
            }}
            variant="contained"
          >
            <CompareArrowsIcon sx={{ fontSize: 30 }} />
          </Button>
        </Grid>
        <Grid item xs={2}>
        <Autocomplete
            defaultValue={toCurrency}
            value={toCurrency}
            options={currency}
            id="disable-clearable"
            disableClearable
            onChange={(event, value) => dispatch(setToCurrency(value))}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="standard" />
            )}
            onBlur={() => {
              if (!currency.includes(toCurrency)) {
                dispatch(setToCurrency(""));
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <ColorButton onClick={handleConversion} variant="contained">
            Convert
          </ColorButton>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={2} className="paddingTop">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            {amount + " " + fromCurrency + " " + "=" + " "}{" "}
            <span className="colorAccent">
              {conversionResult + " " + toCurrency}
            </span>
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            1 {fromCurrency} = {fromToTo} {toCurrency}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            1 {toCurrency} = {toToFrom} {fromCurrency}
          </Typography>
        </Grid>
      </Grid>
      <Divider/>
      
      <ExchangeHistory />
      
    </>
  );
};

export default CurrencyConverter;
