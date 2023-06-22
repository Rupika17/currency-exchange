export const setAmount = (amount) => {
    return {
      type: 'SET_AMOUNT',
      payload: amount,
    };
  };
  
  export const setFromCurrency = (currency) => {
    return {
      type: 'SET_FROM_CURRENCY',
      payload: currency,
    };
  };
  export const setHighestCurrency = (high) => {
    return {
      type: 'SET_HIGHEST_CURRENCY',
      payload: high,
    };
  };
  export const setLowestCurrency = (low) => {
    return {
      type: 'SET_LOWEST_CURRENCY',
      payload: low,
    };
  };
  export const setAverageCurrency = (avg) => {
    return {
      type: 'SET_AVERAGE_CURRENCY',
      payload: avg,
    };
  };
  export const SET_INTERVAL = "SET_INTERVAL";

  export const setIntervalValue = (interval) => ({
    type: SET_INTERVAL,
    payload: interval,
  });

  export const setToCurrency = (currency) => {
    return {
      type: "SET_TO_CURRENCY",
      payload: currency,
    };
  };
  
  export const setConversionResult = (result) => {
    return {
      type: 'SET_CONVERSION_RESULT',
      payload: result,
    };
  };
  
  export const setConversionHistory = (history) => {
    return {
      type: 'SET_CONVERSION_HISTORY',
      payload: history,
    };
  };

  export const setExchangeRate = (rates) => {
      return {
        type: 'SET_EXCHANGE_RATE',
        payload: rates,
      };
  };
  
  export const setCurrency = (currency) => {
    return {
      type: 'SET_CURRENCY',
      payload: currency,
    };
};

export const setTotoFrom = (toToFrom) => {
  return {
    type: 'SET_TO_TO_FROM',
    payload: toToFrom,
  };
};

export const setFromtoTo = (fromToTo) => {
  return {
    type: 'SET_FROM_TO_TO',
    payload: fromToTo,
  };
};