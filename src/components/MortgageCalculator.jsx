import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const MortgageCalculator = ({ propertyPrice = 0 }) => {
  const [price, setPrice] = useState(propertyPrice);
  const [deposit, setDeposit] = useState(propertyPrice * 0.1);
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const { formatPrice, currency } = useCurrency();

  const [results, setResults] = useState({
    monthlyPayment: 0,
    stampDuty: 0,
  });

  useEffect(() => {
    // Mortgage Calculation
    const principal = price - deposit;
    let monthly = 0;
    
    if (principal > 0 && term > 0) {
      if (rate === 0) {
        monthly = principal / (term * 12);
      } else {
        const monthlyRate = rate / 100 / 12;
        const numPayments = term * 12;
        monthly = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
      }
    }

    // Stamp Duty Calculation (UK 2025 thresholds)
    let stampDuty = 0;
    let taxablePrice = price;

    if (isFirstTimeBuyer && price <= 625000) {
      if (price > 425000) {
        stampDuty = (price - 425000) * 0.05;
      }
    } else {
      // Standard Rates
      if (taxablePrice > 1500000) {
        stampDuty += (taxablePrice - 1500000) * 0.12;
        taxablePrice = 1500000;
      }
      if (taxablePrice > 925000) {
        stampDuty += (taxablePrice - 925000) * 0.10;
        taxablePrice = 925000;
      }
      if (taxablePrice > 250000) {
        stampDuty += (taxablePrice - 250000) * 0.05;
        taxablePrice = 250000;
      }
      if (taxablePrice > 125000) {
        stampDuty += (taxablePrice - 125000) * 0.02;
      }
    }

    setResults({
      monthlyPayment: monthly,
      stampDuty: stampDuty
    });
  }, [price, deposit, term, rate, isFirstTimeBuyer]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-10">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-gold-500 mr-3" />
        <h3 className="text-2xl font-bold text-navy-900">Stamp Duty & Mortgage Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Property Price (£)</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deposit (£)</label>
            <input 
              type="number" 
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Term (Years)</label>
              <input 
                type="number" 
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center pt-2">
            <input 
              type="checkbox" 
              id="ftb" 
              checked={isFirstTimeBuyer}
              onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
              className="h-5 w-5 text-gold-500 rounded border-slate-300 focus:ring-gold-500"
            />
            <label htmlFor="ftb" className="ml-3 text-slate-700 font-medium cursor-pointer">
              I am a First-Time Buyer
            </label>
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
          <div className="mb-6 pb-6 border-b border-slate-200">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">Estimated Monthly Payment</p>
            <p className="text-4xl font-bold text-navy-900">
              {results.monthlyPayment > 0 ? formatPrice(results.monthlyPayment) : `${currency.symbol}0`}
            </p>
            <p className="text-xs text-slate-400 mt-2">Principal & Interest only · Displayed in {currency.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">Stamp Duty (SDLT) Owed</p>
            <p className="text-3xl font-bold text-navy-900">
              {results.stampDuty > 0 ? formatPrice(results.stampDuty) : '£0'}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {isFirstTimeBuyer && price <= 625000 
                ? 'First-Time Buyer SDLT relief applied (England & N. Ireland).' 
                : 'Standard UK Stamp Duty Land Tax (SDLT) rates.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
