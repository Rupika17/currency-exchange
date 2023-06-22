import { SET_INTERVAL } from "../actions/actions";
import intervalOptions from "../intervalOptions";
const initialState = {
  amount: 0,
  fromCurrency: "USD",
  toCurrency: "EUR",
  conversionResult: 0,
  conversionHistory: [],
  interval: intervalOptions[0].label,
  exchangeRate: [],
  highest: 0,
  lowest: 0,
  average: 0,
  currency: [],
  toToFrom: "USD", 
  fromToTo: "EUR"
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };
    case "SET_FROM_CURRENCY":
      return {
        ...state,
        fromCurrency: action.payload,
      };
    case "SET_TO_CURRENCY":
      return {
        ...state,
        toCurrency: action.payload,
      };
    case SET_INTERVAL:
      return {
        ...state,
        interval: action.payload,
      };
    case "SET_CONVERSION_RESULT":
      return {
        ...state,
        conversionResult: action.payload,
      };
    case "SET_CONVERSION_HISTORY":
      return {
        ...state,
        conversionHistory: action.payload,
      };
    case "SET_EXCHANGE_RATE":
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case "SET_HIGHEST_CURRENCY":
      return {
        ...state,
        highest: action.payload,
      };
    case "SET_LOWEST_CURRENCY":
      return {
        ...state,
        lowest: action.payload,
      };
    case "SET_AVERAGE_CURRENCY":
      return {
        ...state,
        average: action.payload,
      };
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    case "SET_TO_TO_FROM":
      return {
        ...state,
        toToFrom: action.payload,
      };
    case "SET_FROM_TO_TO":
      return {
        ...state,
        fromToTo: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
