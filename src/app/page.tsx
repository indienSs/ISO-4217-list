import CurrencyList from "@/components/CurrencyList";
import { countriesWithCurrencies } from "@/data/currencies";

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <CurrencyList data={countriesWithCurrencies} />
    </main>
  );
}
