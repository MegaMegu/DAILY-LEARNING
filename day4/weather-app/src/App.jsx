import { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const defaultCities = [
    "Manila",
    "Quezon City",
    "Plaridel",
    "London",
    "New York",
    "Tokyo",
    "Paris",
  ];

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.log(`Error Fetching Data: ${err}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center bg-gradient-to-br from-blue-400 via-sky-400 to-indigo-400 px-6 py-4 rounded-xl min-h-56 max-h-screen max-w-screen">
        <h1 className="text-white text-center text-4xl font-bold">Weather</h1>

        <div className="flex p-2 flex-col relative">
          <form
            onSubmit={getWeather}
            className="flex mt-2 items-center justify-center gap-2 self-start"
          >
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => setShowSuggestions(true)} // show when clicked
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // hide after click
              placeholder="Search Location"
              className="outline-none focus:ring-2 focus:ring-orange-300 rounded-xl p-1 pl-3 text-white text-lg"
            />
            <button
              type="submit"
              className="border-2 p-1 bg-gradient-to-br from-indigo-400 via-sky-400 to-blue-400 border-orange-300 rounded-xl text-white text-lg hover:scale-109 transition hover:cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <ul className="absolute top-14 left-0 bg-white rounded-xl shadow-lg w-full max-h-40 overflow-y-auto z-10">
              {defaultCities.map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setShowSuggestions(false);
                  }}
                  className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          {/* Weather Icon */}
          {weather && (
            <div className="flex items-center justify-center mt-6">
              {weather.description === "clear sky" && (
                <img
                  className="w-20"
                  src="https://images.emojiterra.com/twitter/v14.0/512px/2600.png"
                  alt="Sunny"
                />
              )}
              {weather.description.includes("rain") && (
                <img
                  className="w-20"
                  src="https://cdn-icons-png.flaticon.com/512/3937/3937493.png"
                  alt="Rainy"
                />
              )}
              {weather.description.includes("cloud") && (
                <img
                  className="w-20"
                  src="https://cdn-icons-png.flaticon.com/512/1850/1850730.png"
                  alt="Cloudy"
                />
              )}
            </div>
          )}

          {/* Weather Info */}
          {weather && (
            <div className="mt-4 text-white text-center">
              <h2 className="text-2xl font-semibold">{weather.city}</h2>
              <p className="text-lg">{weather.temp}°C</p>
              <p className="italic">{weather.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
