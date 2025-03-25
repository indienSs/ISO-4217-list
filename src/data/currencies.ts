export interface CountryCurrency {
    country: string;
    currencies: Curency[];
}

interface Curency {
    code: string;
    name: string;
    symbol?: string;
}

export const countriesWithCurrencies: CountryCurrency[] = [
    {
        country: "United States",
        currencies: [
            { code: "USD", name: "United States dollar", symbol: "$" }
        ]
    },
    {
        country: "European Union",
        currencies: [
            { code: "EUR", name: "Euro", symbol: "€" }
        ]
    },
    {
        country: "Japan",
        currencies: [
            { code: "JPY", name: "Japanese yen", symbol: "¥" }
        ]
    },
    {
        country: "United Kingdom",
        currencies: [
            { code: "GBP", name: "British pound", symbol: "£" }
        ]
    },
    {
        country: "Switzerland",
        currencies: [
            { code: "CHF", name: "Swiss franc" }
        ]
    },
    {
        country: "Australia",
        currencies: [
            { code: "AUD", name: "Australian dollar", symbol: "$" }
        ]
    },
    {
        country: "Canada",
        currencies: [
            { code: "CAD", name: "Canadian dollar", symbol: "$" }
        ]
    },
    {
        country: "China",
        currencies: [
            { code: "CNY", name: "Chinese yuan", symbol: "¥" }
        ]
    },
    {
        country: "India",
        currencies: [
            { code: "INR", name: "Indian rupee", symbol: "₹" }
        ]
    },
    {
        country: "South Africa",
        currencies: [
            { code: "ZAR", name: "South African rand", symbol: "R" }
        ]
    },
];