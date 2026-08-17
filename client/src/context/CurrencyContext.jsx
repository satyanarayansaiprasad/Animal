import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { apiFetch } from '../services/api';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const { language } = useLanguage();
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('alnamoos_currency') || 'OMR';
  });
  
  // Default FX rate: 1 OMR = 9.55 AED
  const [omrToAedRate, setOmrToAedRate] = useState(9.55);

  useEffect(() => {
    localStorage.setItem('alnamoos_currency', currency);
  }, [currency]);

  // Fetch live exchange rate from backend settings if available
  useEffect(() => {
    apiFetch('/api/settings')
      .then((res) => {
        if (res && res.success && res.data && res.data.omr_to_aed) {
          setOmrToAedRate(res.data.omr_to_aed);
        }
      })
      .catch(() => {
        // Fallback to 9.55 if server offline
      });
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'OMR' ? 'AED' : 'OMR'));
  };

  /**
   * Format given price in OMR into active currency string using mono numbers
   */
  const formatPrice = (omrPrice) => {
    const num = Number(omrPrice) || 0;
    if (currency === 'OMR') {
      const formatted = num.toFixed(3);
      return language === 'ar' ? `${formatted} ر.ع` : `${formatted} OMR`;
    } else {
      const aedAmount = (num * omrToAedRate).toFixed(2);
      return language === 'ar' ? `${aedAmount} د.إ` : `${aedAmount} AED`;
    }
  };

  const getPriceComponents = (omrPrice) => {
    const num = Number(omrPrice) || 0;
    if (currency === 'OMR') {
      return {
        amount: num.toFixed(3),
        symbol: language === 'ar' ? 'ر.ع' : 'OMR',
        currencyCode: 'OMR'
      };
    } else {
      return {
        amount: (num * omrToAedRate).toFixed(2),
        symbol: language === 'ar' ? 'د.إ' : 'AED',
        currencyCode: 'AED'
      };
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        omrToAedRate,
        setOmrToAedRate,
        formatPrice,
        getPriceComponents,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
