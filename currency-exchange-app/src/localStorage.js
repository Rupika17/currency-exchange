export const saveConversionHistory = (history) => {
    try {
      localStorage.setItem('conversionHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving conversion history to localStorage:', error);
    }
  };
  
  export const loadConversionHistory = () => {
    try {
      const history = localStorage.getItem('conversionHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading conversion history from localStorage:', error);
      return [];
    }
  };
  