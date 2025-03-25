'use client'

import { useState, useEffect } from 'react';
import { CountryCurrency, getCountries, saveCountries, updateCountryStatus } from '@/lib/db';
import { fetchCountriesWithCurrencies } from '@/lib/api';
import LoadingSpinner from './LoadingSpinner';

export default function CurrencyList() {
    const [countries, setCountries] = useState<CountryCurrency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                
                const dbCountries = await getCountries();
                
                if (dbCountries.length > 0) {
                    setCountries(dbCountries);
                } else {
                    const apiCountries = await fetchCountriesWithCurrencies();
                    await saveCountries(apiCountries);
                    setCountries(apiCountries);
                }
            } catch (err) {
                setError('Failed to load data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const toggleCountry = async (country: string) => {
        try {
            const updatedCountries = countries.map(c => 
                c.country === country ? { ...c, isActive: !c.isActive } : c
            );
            
            setCountries(updatedCountries);
            await updateCountryStatus(country, !countries.find(c => c.country === country)!.isActive);
        } catch (err) {
            console.error('Error updating country status:', err);
            setError('Failed to update country status.');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-4 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Country Currency Manager</h1>
            <div className="space-y-4">
                {countries.map((item) => (
                    <div 
                        key={item.country}
                        className={`p-4 border rounded-lg transition-colors ${
                            item.isActive
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
                                    checked={item.isActive}
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