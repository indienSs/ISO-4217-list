import { CountryCurrency } from './db';

const API_URL = 'https://restcountries.com/v3.1/all';

export async function fetchCountriesWithCurrencies(): Promise<CountryCurrency[]> {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const result: CountryCurrency[] = [];
        const processedCountries = new Set();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((country: any) => {
            if (country.currencies && country.name && !processedCountries.has(country.name.common)) {
                const currencies = Object.entries(country.currencies)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map(([code, currency]: [string, any]) => ({
                        code,
                        name: currency.name,
                        symbol: currency.symbol
                    }));

                result.push({
                    country: country.name.common,
                    currencies,
                    isActive: true
                });

                processedCountries.add(country.name.common);
            }
        });

        return result.sort((a, b) => a.country.localeCompare(b.country));
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
}