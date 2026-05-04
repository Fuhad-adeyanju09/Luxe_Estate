import React, { createContext, useContext, useState } from 'react';

const currencies = {
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound', rate: 1 },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro', rate: 1.17 },
  USD: { symbol: '$', code: 'USD', name: 'US Dollar', rate: 1.26 },
  AED: { symbol: 'AED', code: 'AED', name: 'UAE Dirham', rate: 4.63 },
  CAD: { symbol: 'CA$', code: 'CAD', name: 'Canadian Dollar', rate: 1.72 },
};

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');

  const currency = currencies[selectedCurrency];

  const formatPrice = (priceInGBP) => {
    const converted = Math.round(priceInGBP * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const formatPriceRaw = (priceInGBP) => {
    return Math.round(priceInGBP * currency.rate);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencies,
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        formatPriceRaw,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
