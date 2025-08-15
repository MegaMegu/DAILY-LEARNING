import React from "react";
import { useState } from "react";

const App = () => {
  const [quote, setQuote] = useState();

  const newQuote = async () => {
    const res = await fetch("http://localhost:5000/quote");
    const data = await res.json();
    setQuote(data.quote);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-6 rounded-xl shadow-lg text-center max-w-md mx-auto mt-20">
      <p className="text-white text-lg mb-4">{quote}</p>
      <button
        className="bg-white text-purple-600 px-4 py-2 rounded hover:scale-105 transition-transform"
        onClick={newQuote}
      >
        New Quote
      </button>
    </div>
  );
};

export default App;
