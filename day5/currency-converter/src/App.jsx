import React, { useState } from "react";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("Convert Money");

  const currencies = ["USD", "EUR", "GBP", "JPY", "PHP", "AUD", "CAD"];
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    PHP: "₱",
    AUD: "A$",
    CAD: "C$",
  };

  const convertCurrency = async (e) => {
    e.preventDefault();
    if (!amount) return;

    try {
      const res = await fetch(
        `http://localhost:5000/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setResult(data.converted);
    } catch (err) {
      console.log("Error fetching conversion:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="min-h-45 p-3 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600 flex items-center gap-2 flex-col rounded-xl">
        <h1 className="text-white text-2xl font-extrabold leading-relaxed">
          Currency Converter
        </h1>
        <div className="flex flex-col items-center ">
          <form
            onSubmit={convertCurrency}
            action="submit"
            className="flex flex-row gap-3"
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Insert Currency"
              className="outline-none focus:ring-2 focus:ring-sky-400 rounded-xl px-3 text-white py-2"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-sky-300 hover:cursor-pointer font-medium text-white rounded-xl px-3 py-2"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="p-4 text-white font-bold">To</p>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-sky-300 hover:cursor-pointer font-medium text-white rounded-xl px-3 py-2"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="text-white font-medium border-2 border-sky-300 px-3 py-2 rounded-lg bg-gradient-to-br from-indigo-400 via-blue-400 to-sky-400 hover:scale-109 transition hover:cursor-pointer"
            >
              Convert
            </button>
          </form>
          {result !== null && (
            <div className="flex flex-col items-center justify-center mt-3 gap-2">
              <h1 className="text-9xl font-extrabold text-white">
                {currencySymbols[toCurrency]}
              </h1>
              <h2 className="text-white font-bold text-xl">{result}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
