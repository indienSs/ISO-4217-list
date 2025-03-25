'use client'

import { useState, useEffect } from 'react';
import { CountryCurrency } from '../data/currencies';

interface CurrencyListProps {
  data: CountryCurrency[];
}

export default function CurrencyList({ data }: CurrencyListProps) {
  const [activeCountries, setActiveCountries] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('activeCountries');
    if (saved) {
      setActiveCountries(JSON.parse(saved));
    } else {
      const initialActive: Record<string, boolean> = {};
      data.forEach(item => {
        initialActive[item.country] = true;
      });
      setActiveCountries(initialActive);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(activeCountries).length > 0) {
      localStorage.setItem('activeCountries', JSON.stringify(activeCountries));
    }
  }, [activeCountries]);

  const toggleCountry = (country: string) => {
    setActiveCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Country Currency Manager</h1>
      <div className="space-y-4">
        {data.map((item) => (
          <div 
            key={item.country}
            className={`p-4 border rounded-lg transition-colors ${
              activeCountries[item.country] 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{item.country}</h2>
                <div className="mt-1 text-sm text-gray-600">
                  {item.currencies.map(currency => (
                    <span key={currency.code} className="mr-2">
                      {currency.code} - {currency.name}
                      {currency.symbol && ` (${currency.symbol})`}
                    </span>
                  ))}
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!activeCountries[item.country]}
                  onChange={() => toggleCountry(item.country)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}